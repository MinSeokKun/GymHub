import * as jose from 'jose';
import { User } from '../../../prisma/generated/core';

// 환경 변수에서 JWT 시크릿 가져오기
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
// 토큰 만료 시간 (기본 8시간)
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '8h';

// 민감한 정보를 제외한 사용자 타입
type SafeUser = Omit<User, 'password'>;

// jose 라이브러리의 JWTPayload 타입과 호환되도록 수정
interface JwtPayload extends jose.JWTPayload {
  id: number;
  email: string;
  name: string;
  role: string;
}

/**
 * 사용자 정보로 JWT 토큰 생성
 * @param user 사용자 객체
 * @returns JWT 토큰 문자열
 */
export async function generateToken(user: SafeUser): Promise<string> {
  // 시크릿 키를 TextEncoder로 인코딩
  const secretKey = new TextEncoder().encode(JWT_SECRET);
  
  // jose 라이브러리와 호환되는 페이로드 생성
  const payload = {
    // jose 라이브러리에서 요구하는 표준 클레임
    sub: String(user.id),     // subject (사용자 ID)
    // 사용자 정의 클레임
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  // 만료 시간 계산
  const expiryValue = TOKEN_EXPIRY.match(/(\d+)([smhd])/);
  let expiryTime: number;
  
  if (expiryValue) {
    const [_, value, unit] = expiryValue;
    const numValue = parseInt(value, 10);
    
    switch (unit) {
      case 's': expiryTime = numValue; break;
      case 'm': expiryTime = numValue * 60; break;
      case 'h': expiryTime = numValue * 60 * 60; break;
      case 'd': expiryTime = numValue * 60 * 60 * 24; break;
      default: expiryTime = 8 * 60 * 60; // 기본 8시간
    }
  } else {
    expiryTime = 8 * 60 * 60; // 기본 8시간
  }

  // JWT 토큰 생성
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${expiryTime}s`)
    .sign(secretKey);
}

/**
 * JWT 토큰 검증 및 디코딩
 * @param token JWT 토큰
 * @returns 성공 시 디코딩된 페이로드, 실패 시 null
 */
export async function verifyToken(token: string): Promise<jose.JWTPayload | null> {
  try {
    // 시크릿 키를 TextEncoder로 인코딩
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    
    // 토큰 검증
    const { payload } = await jose.jwtVerify(token, secretKey);
    
    return payload;
  } catch (error) {
    console.error('JWT 검증 오류:', error);
    return null;
  }
}

/**
 * 헤더에서 JWT 토큰 추출
 * @param authHeader Authorization 헤더 값
 * @returns 추출된 토큰 또는 null
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7); // 'Bearer ' 제거
}