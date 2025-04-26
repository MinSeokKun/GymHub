/**
 * @openapi
 * openapi: 3.0.0
 * info:
 *   title: 헬스장 관리 SaaS API
 *   description: 헬스장 회원, 트레이너, PT 관리를 위한 API 문서
 *   version: 1.0.0
 * servers:
 *   - url: http://localhost:3000/api
 *     description: 개발 서버
 * tags:
 *   - name: 사용자 관리
 *     description: 관리자 사용자 계정 관리
 *   - name: 헬스장 관리
 *     description: 헬스장 등록 및 관리
 *   - name: 회원 관리
 *     description: 헬스장 회원 등록 및 관리
 */

// 스키마 정의들을 가져옵니다
const coreSchemas = require('./schemas/core');
const memberSchemas = require('./schemas/members');

// API 경로 정의들을 가져옵니다
const coreUsersPaths = require('./paths/core-users');
const gymsPaths = require('./paths/gyms');
const memberPaths = require('./paths/members');

// 전체 Swagger 스펙을 구성합니다
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '헬스장 관리 SaaS API',
    description: '헬스장 회원, 트레이너, PT 관리를 위한 API 문서',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: '개발 서버',
    },
  ],
  tags: [
    {
      name: '사용자 관리',
      description: '관리자 사용자 계정 관리',
    },
    {
      name: '헬스장 관리',
      description: '헬스장 등록 및 관리',
    },
    {
      name: '회원 관리',
      description: '헬스장 회원 등록 및 관리',
    },
  ],
  paths: {
    ...coreUsersPaths,
    ...gymsPaths,
    ...memberPaths,
  },
  components: {
    schemas: {
      ...coreSchemas,
      ...memberSchemas,
    },
  },
};

module.exports = swaggerDefinition;