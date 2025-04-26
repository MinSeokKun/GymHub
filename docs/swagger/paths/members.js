/**
 * @openapi
 * /tenant/members:
 *   get:
 *     summary: 회원 목록 조회
 *     description: 모든 회원의 목록을 페이지네이션과 함께 조회합니다.
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
 *               type: object
 *               properties:
 *                 members:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Member'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *   post:
 *     summary: 회원 등록
 *     description: 새로운 회원을 등록합니다.
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
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               birth:
 *                 type: string
 *                 format: date
 *               memo:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: 잘못된 요청
 *       409:
 *         description: 이메일 중복
 *       500:
 *         description: 서버 오류
 * 
 * /tenant/members/{id}:
 *   get:
 *     summary: 회원 상세 조회
 *     description: 특정 회원의 상세 정보를 조회합니다.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 회원 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: 회원을 찾을 수 없음
 */

// 회원 관련 API 경로 정의
const memberPaths = {
  '/tenant/members': {
    get: {
      summary: '회원 목록 조회',
      description: '모든 회원의 목록을 페이지네이션과 함께 조회합니다.',
      parameters: [
        {
          name: 'search',
          in: 'query',
          schema: {
            type: 'string',
          },
          description: '회원 이름, 전화번호, 이메일로 검색',
        },
        // ... 나머지 파라미터
      ],
      responses: {
        // ... 응답 정의
      },
    },
    post: {
      // ... POST 메서드 정의
    },
  },
  '/tenant/members/{id}': {
    get: {
      // ... GET 메서드 정의
    },
  },
};

module.exports = memberPaths;