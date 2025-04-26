/**
 * @openapi
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "홍길동"
 *         phone:
 *           type: string
 *           example: "010-1234-5678"
 *         email:
 *           type: string
 *           nullable: true
 *           example: "user@example.com"
 *         birth:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: "1990-01-01"
 *         memo:
 *           type: string
 *           nullable: true
 *           example: "신규 회원"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// 회원 스키마 정의
const memberSchemas = {
  Member: {
    type: 'object',
    required: ['name', 'phone'],
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
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
        nullable: true,
        example: 'user@example.com',
      },
      birth: {
        type: 'string',
        format: 'date',
        nullable: true,
        example: '1990-01-01',
      },
      memo: {
        type: 'string',
        nullable: true,
        example: '신규 회원',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
};

module.exports = memberSchemas;