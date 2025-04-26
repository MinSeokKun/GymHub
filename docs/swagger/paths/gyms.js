/**
 * @openapi
 * /gyms:
 *   post:
 *     summary: 새 헬스장 등록
 *     description: 새로운 헬스장을 등록하고 테넌트 DB를 생성합니다.
 *     tags:
 *       - 헬스장 관리
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - ownerId
 *             properties:
 *               name:
 *                 type: string
 *                 description: 헬스장 이름
 *                 example: "파워 휘트니스"
 *               ownerId:
 *                 type: integer
 *                 description: 소유자 ID (사용자 ID)
 *                 example: 1
 *     responses:
 *       200:
 *         description: 헬스장 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "파워 휘트니스"
 *                 dbName:
 *                   type: string
 *                   example: "gym_파워_휘트니스"
 *                 ownerId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "헬스장 이름과 소유자 ID는 필수입니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "헬스장 생성 중 오류가 발생했습니다."
 */

// Gyms API 경로 정의
const gymsPaths = {
  '/gyms': {
    post: {
      summary: '새 헬스장 등록',
      description: '새로운 헬스장을 등록하고 테넌트 DB를 생성합니다.',
      tags: ['헬스장 관리'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'ownerId'],
              properties: {
                name: {
                  type: 'string',
                  description: '헬스장 이름',
                  example: '파워 휘트니스',
                },
                ownerId: {
                  type: 'integer',
                  description: '소유자 ID (사용자 ID)',
                  example: 1,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: '헬스장 등록 성공',
          content: {
            'application/json': {
              schema: {
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
                  ownerId: {
                    type: 'integer',
                    example: 1,
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
                    example: '헬스장 이름과 소유자 ID는 필수입니다.',
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
                    example: '헬스장 생성 중 오류가 발생했습니다.',
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

module.exports = gymsPaths;