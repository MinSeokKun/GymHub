/**
 * @openapi
 * /tenant/members:
 *   get:
 *     summary: 회원 목록 조회
 *     description: 모든 회원의 목록을 페이지네이션과 함께 조회합니다.
 *     tags:
 *       - 회원 관리
 *     parameters:
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: 회원 이름, 전화번호, 이메일로 검색
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지당 항목 수
 *     responses:
 *       200:
 *         description: 회원 목록 반환 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemberList'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "테넌트 DB 정보가 없습니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "회원 목록 조회 중 오류가 발생했습니다."
 *   post:
 *     summary: 회원 등록
 *     description: 새로운 회원을 등록합니다.
 *     tags:
 *       - 회원 관리
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "홍길동"
 *               phone:
 *                 type: string
 *                 example: "010-1234-5678"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               birth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               memo:
 *                 type: string
 *                 example: "신규 회원"
 *     responses:
 *       201:
 *         description: 회원 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "이름과 연락처는 필수 입력 사항입니다."
 *       409:
 *         description: 이메일 중복
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "이미 등록된 이메일입니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "회원 등록 중 오류가 발생했습니다."
 */

// 회원 관련 API 경로 정의
const memberPaths = {
  '/tenant/members': {
    get: {
      summary: '회원 목록 조회',
      description: '모든 회원의 목록을 페이지네이션과 함께 조회합니다.',
      tags: ['회원 관리'],
      parameters: [
        {
          name: 'search',
          in: 'query',
          schema: {
            type: 'string',
          },
          description: '회원 이름, 전화번호, 이메일로 검색',
        },
        {
          name: 'page',
          in: 'query',
          schema: {
            type: 'integer',
            default: 1,
          },
          description: '페이지 번호',
        },
        {
          name: 'limit',
          in: 'query',
          schema: {
            type: 'integer',
            default: 10,
          },
          description: '페이지당 항목 수',
        },
      ],
      responses: {
        200: {
          description: '회원 목록 반환 성공',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MemberList',
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
                    example: '테넌트 DB 정보가 없습니다.',
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
                    example: '회원 목록 조회 중 오류가 발생했습니다.',
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      summary: '회원 등록',
      description: '새로운 회원을 등록합니다.',
      tags: ['회원 관리'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'phone'],
              properties: {
                name: {
                  type: 'string',
                  example: '홍길동',
                },
                phone: {
                  type: 'string',
                  example: '010-1234-5678',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'user@example.com',
                },
                birth: {
                  type: 'string',
                  format: 'date',
                  example: '1990-01-01',
                },
                memo: {
                  type: 'string',
                  example: '신규 회원',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: '회원 등록 성공',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Member',
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
                    example: '이름과 연락처는 필수 입력 사항입니다.',
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
                    example: '이미 등록된 이메일입니다.',
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
                    example: '회원 등록 중 오류가 발생했습니다.',
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

module.exports = memberPaths;