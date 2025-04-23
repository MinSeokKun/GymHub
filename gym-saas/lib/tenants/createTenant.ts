import mysql from "mysql2/promise";
import { execSync } from "child_process";
import slugify from "slugify";
import path from "path";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();

export async function createTenantDB(gymName: string) {
  const dbName = `gym_${slugify(gymName, { lower: true })}`;

  console.log(`헬스장 DB 생성: ${dbName}`);

  // 1. DB 생성
  const connection = await mysql.createConnection(process.env.DB_TEMPLATE!);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  
  // 2. 마이그레이션 SQL 파일 경로
  const migrationFilePath = path.join(
    process.cwd(), 
    "prisma", 
    "migrations-tenant", 
    "create_tenant_tables",
    "migration.sql"
  );
  
  // 3. SQL 파일 내용 읽기
  const sql = fs.readFileSync(migrationFilePath, 'utf8');
  
  // 4. DB 선택 후 SQL 실행
  await connection.query(`USE \`${dbName}\`;`);
  
  // SQL 문 분리 및 실행 (여러 쿼리가 있을 경우를 대비)
  const statements = sql.split(';').filter(stmt => stmt.trim());
  
  for (const stmt of statements) {
    if (stmt.trim()) {
      console.log(`실행 중: ${stmt.slice(0, 50)}...`);
      await connection.query(stmt);
    }
  }
  
  await connection.end();
  console.log(`헬스장 DB 생성 및 마이그레이션 완료: ${dbName}`);

  return dbName;
}