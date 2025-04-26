/**
 * @openapi
 * components:
 *   schemas:
 *     Trainer:
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
 *           example: "김트레이너"
 *         phone:
 *           type: string
 *           example: "010-9876-5432"
 *         schedule:
 *           type: string
 *           nullable: true
 *           example: "월,수,금 오전 9시-오후 6시"
 *         trainerNote:
 *           type: string
 *           nullable: true
 *           example: "PT 전문, 다이어트 코칭"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - ptCount
 *         - durationMonths
 *         - price
 *         - type
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "3개월 PT 30회"
 *         ptCount:
 *           type: integer
 *           example: 30
 *         durationMonths:
 *           type: integer
 *           example: 3
 *         price:
 *           type: integer
 *           example: 1200000
 *         type:
 *           type: string
 *           enum: [pt, gym, combo]
 *           example: "pt"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "3개월 동안 PT 30회 이용 가능한 패키지"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Payment:
 *       type: object
 *       required:
 *         - memberId
 *         - productId
 *         - startDate
 *         - endDate
 *         - ptCount
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         memberId:
 *           type: integer
 *           example: 1
 *         productId:
 *           type: integer
 *           example: 1
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2025-04-01"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2025-07-01"
 *         ptCount:
 *           type: integer
 *           example: 30
 *         price:
 *           type: integer
 *           example: 1200000
 *         paidAt:
 *           type: string
 *           format: date-time
 *         memo:
 *           type: string
 *           nullable: true
 *           example: "카드 결제"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PTSession:
 *       type: object
 *       required:
 *         - memberId
 *         - trainerId
 *         - scheduledAt
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         memberId:
 *           type: integer
 *           example: 1
 *         trainerId:
 *           type: integer
 *           example: 1
 *         scheduledAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-27T14:00:00Z"
 *         status:
 *           type: string
 *           enum: [reserved, done, canceled]
 *           example: "reserved"
 *         note:
 *           type: string
 *           nullable: true
 *           example: "하체 운동 중점"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Attendance:
 *       type: object
 *       required:
 *         - memberId
 *         - attendedAt
 *         - type
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         memberId:
 *           type: integer
 *           example: 1
 *         attendedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-27T09:30:00Z"
 *         type:
 *           type: string
 *           enum: [general, pt]
 *           example: "general"
 *         memo:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// Tenant DB 스키마 정의
const tenantSchemas = {
  Trainer: {
    type: 'object',
    required: ['name', 'phone'],
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      name: {
        type: 'string',
        example: '김트레이너',
      },
      phone: {
        type: 'string',
        example: '010-9876-5432',
      },
      schedule: {
        type: 'string',
        nullable: true,
        example: '월,수,금 오전 9시-오후 6시',
      },
      trainerNote: {
        type: 'string',
        nullable: true,
        example: 'PT 전문, 다이어트 코칭',
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
  Product: {
    type: 'object',
    required: ['name', 'ptCount', 'durationMonths', 'price', 'type'],
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      name: {
        type: 'string',
        example: '3개월 PT 30회',
      },
      ptCount: {
        type: 'integer',
        example: 30,
      },
      durationMonths: {
        type: 'integer',
        example: 3,
      },
      price: {
        type: 'integer',
        example: 1200000,
      },
      type: {
        type: 'string',
        enum: ['pt', 'gym', 'combo'],
        example: 'pt',
      },
      description: {
        type: 'string',
        nullable: true,
        example: '3개월 동안 PT 30회 이용 가능한 패키지',
      },
      isActive: {
        type: 'boolean',
        example: true,
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
  Payment: {
    type: 'object',
    required: ['memberId', 'productId', 'startDate', 'endDate', 'ptCount', 'price'],
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      memberId: {
        type: 'integer',
        example: 1,
      },
      productId: {
        type: 'integer',
        example: 1,
      },
      startDate: {
        type: 'string',
        format: 'date',
        example: '2025-04-01',
      },
      endDate: {
        type: 'string',
        format: 'date',
        example: '2025-07-01',
      },
      ptCount: {
        type: 'integer',
        example: 30,
      },
      price: {
        type: 'integer',
        example: 1200000,
      },
      paidAt: {
        type: 'string',
        format: 'date-time',
      },
      memo: {
        type: 'string',
        nullable: true,
        example: '카드 결제',
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
  PTSession: {
    type: 'object',
    required: ['memberId', 'trainerId', 'scheduledAt'],
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      memberId: {
        type: 'integer',
        example: 1,
      },
      trainerId: {
        type: 'integer',
        example: 1,
      },
      scheduledAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-04-27T14:00:00Z',
      },
      status: {
        type: 'string',
        enum: ['reserved', 'done', 'canceled'],
        example: 'reserved',
      },
      note: {
        type: 'string',
        nullable: true,
        example: '하체 운동 중점',
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
  Attendance: {
    type: 'object',
    required: ['memberId', 'attendedAt', 'type'],
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      memberId: {
        type: 'integer',
        example: 1,
      },
      attendedAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-04-27T09:30:00Z',
      },
      type: {
        type: 'string',
        enum: ['general', 'pt'],
        example: 'general',
      },
      memo: {
        type: 'string',
        nullable: true,
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

module.exports = tenantSchemas;