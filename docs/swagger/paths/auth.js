/**
 * @openapi
 * tags:
 *   - name: 인증
 *     description: 사용자 인증 및 계정 관리
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT 토큰을 사용한 인증. 'Bearer' 다음에 공백과 토큰을 입력하세요.
 * 
 * /auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 이메일과 비밀번호로 로그인하여 JWT 토큰을 발급합니다.
 *     tags:
 *       - 인증
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 성공"
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
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "이메일과 비밀번호를 모두 입력해주세요."
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "이메일 또는 비밀번호가 일치하지 않습니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "로그인 중 오류가 발생했습니다."
 * 
 * /auth/me:
 *   get:
 *     summary: 현재 로그인한 사용자 정보 조회
 *     description: 토큰을 기반으로 현재 로그인한 사용자의 정보를 반환합니다.
 *     tags:
 *       - 인증
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
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
 *                     gyms:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "파워 휘트니스"
 *                           dbName:
 *                             type: string
 *                             example: "gym_파워_휘트니스"
 *                     gymAdmin:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           gym:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 2
 *                               name:
 *                                 type: string
 *                                 example: "스마트 헬스클럽"
 *                               dbName:
 *                                 type: string
 *                                 example: "gym_스마트_헬스클럽"
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "인증 토큰이 필요합니다."
 *       404:
 *         description: 사용자 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "사용자를 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "사용자 정보 조회 중 오류가 발생했습니다."
 */

// 인증 관련 API 경로 정의
const authPaths = {
  '/auth/login': {
    post: {
      summary: '사용자 로그인',
      description: '이메일과 비밀번호로 로그인하여 JWT 토큰을 발급합니다.',
      tags: ['인증'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
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
          },
        },
      },
      responses: {
        200: {
          description: '로그인 성공',
          content: {
            'application/json': {
              schema: {
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
                    example: '이메일과 비밀번호를 모두 입력해주세요.',
                  },
                },
              },
            },
          },
        },
        401: {
          description: '인증 실패',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: '이메일 또는 비밀번호가 일치하지 않습니다.',
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
                    example: '로그인 중 오류가 발생했습니다.',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/auth/me': {
    get: {
      summary: '현재 로그인한 사용자 정보 조회',
      description: '토큰을 기반으로 현재 로그인한 사용자의 정보를 반환합니다.',
      tags: ['인증'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: '사용자 정보 조회 성공',
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
                      gyms: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'integer',
                              example: 1,
                            },
                            name: {
                              type: 'string',
                              example: '파워 휘트니스',
                            },
                            dbName: {
                              type: 'string',
                              example: 'gym_파워_휘트니스',
                            },
                          },
                        },
                      },
                      gymAdmin: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            gym: {
                              type: 'object',
                              properties: {
                                id: {
                                  type: 'integer',
                                  example: 2,
                                },
                                name: {
                                  type: 'string',
                                  example: '스마트 헬스클럽',
                                },
                                dbName: {
                                  type: 'string',
                                  example: 'gym_스마트_헬스클럽',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: '인증 실패',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: '인증 토큰이 필요합니다.',
                  },
                },
              },
            },
          },
        },
        404: {
          description: '사용자 없음',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: '사용자를 찾을 수 없습니다.',
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
                    example: '사용자 정보 조회 중 오류가 발생했습니다.',
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

module.exports = authPaths;