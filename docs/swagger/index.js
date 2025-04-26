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
 */

// 스키마 정의들을 가져옵니다
const memberSchemas = require('./schemas/members');
const trainerSchemas = require('./schemas/trainers');
const productSchemas = require('./schemas/products');

// API 경로 정의들을 가져옵니다
const memberPaths = require('./paths/members');
const trainerPaths = require('./paths/trainers');
const productPaths = require('./paths/products');

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
  paths: {
    ...memberPaths,
    ...trainerPaths,
    ...productPaths,
  },
  components: {
    schemas: {
      ...memberSchemas,
      ...trainerSchemas,
      ...productSchemas,
    },
  },
};

module.exports = swaggerDefinition;