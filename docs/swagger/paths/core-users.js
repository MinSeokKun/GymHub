/**
 * @openapi
 * /core/users:
 *   post:
 *     summary: 관리자 사용자 등록
 *     description: 새로운 관리자 사용자를 등록합니다.
 *     tags:
 *       - 사용자 관리
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *               name:
 *                 type: string
 *                 example: "관리자"
 *               role:
 *                 type: string
 *                 enum: [superadmin, admin]
 *                 default: admin
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: 사용자 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     name:
 *                       type: string
 *                       example: "관리자"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "모든 필드를 입력해주세요."
 *       409:
 *         description: 이메일 중복
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "이미 존재하는 이메일입니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "서버 오류"
 */

// Core Users API 경로 정의
const coreUsersPaths = {
  '/core/users': {
    post: {
      summary: '관리자 사용자 등록',
      description: '새로운 관리자 사용자를 등록합니다.',
      tags: ['사용자 관리'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password', 'name'],
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
                name: {
                  type: 'string',
                  example: '관리자',
                },
                role: {
                  type: 'string',
                  enum: ['superadmin', 'admin'],
                  default: 'admin',
                  example: 'admin',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: '사용자 등록 성공',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
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
                },
              },
            },
          },
        },
        400: {
          description: '잘못된 요청',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: '모든 필드를 입력해주세요.',
                  },
                },
              },
            },
          },
        },
        409: {
          description: '이메일 중복',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: '이미 존재하는 이메일입니다.',
                  },
                },
              },
            },
          },
        },
        500: {
          description: '서버 오류',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: '서버 오류',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = coreUsersPaths;