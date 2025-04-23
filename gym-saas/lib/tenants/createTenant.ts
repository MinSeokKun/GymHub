import mysql from "mysql2/promise";
import { execSync } from "child_process";
import slugify from "slugify";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

export async function createTenantDB(gymName: string) {
  const dbName = `gym_${slugify(gymName, { lower: true })}`;

  // 1. DB 생성
  const connection = await mysql.createConnection(process.env.DB_TEMPLATE!);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  await connection.end();

  // 2. 마이그레이션 실행
  const schemaPath = path.join(process.cwd(), "prisma", "schema.tenant.prisma");
  const dbUrl = `${process.env.DB_TEMPLATE}/${dbName}`;

  execSync(`DATABASE_URL_TENANT="${dbUrl}" npx prisma migrate deploy --schema=${schemaPath}`, {
    stdio: "inherit",
  });

  return dbName;
}
