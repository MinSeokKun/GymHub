/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT 토큰을 사용한 인증. 'Bearer' 다음에 공백과 토큰을 입력하세요.
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "admin@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "securepassword123"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "로그인 성공"
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             email:
 *               type: string
 *               example: "admin@example.com"
 *             name:
 *               type: string
 *               example: "관리자"
 *             role:
 *               type: string
 *               example: "admin"
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           example: "admin@example.com"
 *         name:
 *           type: string
 *           example: "관리자"
 *         role:
 *           type: string
 *           example: "admin"
 *         gyms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Gym'
 *         gymAdmin:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               gym:
 *                 $ref: '#/components/schemas/Gym'
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "오류 메시지"
 */

// 인증 관련 스키마 정의
const authSchemas = {
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'admin@example.com',
      },
      password: {
        type: 'string',
        format: 'password',
        example: 'securepassword123',
      },
    },
  },
  LoginResponse: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: '로그인 성공',
      },
      user: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          email: {
            type: 'string',
            example: 'admin@example.com',
          },
          name: {
            type: 'string',
            example: '관리자',
          },
          role: {
            type: 'string',
            example: 'admin',
          },
        },
      },
      token: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  },
  UserProfile: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      email: {
        type: 'string',
        example: 'admin@example.com',
      },
      name: {
        type: 'string',
        example: '관리자',
      },
      role: {
        type: 'string',
        example: 'admin',
      },
      gyms: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Gym',
        },
      },
      gymAdmin: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            gym: {
              $ref: '#/components/schemas/Gym',
            },
          },
        },
      },
    },
  },
  Error: {
    type: 'object',
    properties: {
      error: {
        type: 'string',
        example: '오류 메시지',
      },
    },
  },
};

module.exports = authSchemas;