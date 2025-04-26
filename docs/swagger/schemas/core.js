/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           format: email
 *           example: "admin@example.com"
 *         name:
 *           type: string
 *           example: "관리자"
 *         password:
 *           type: string
 *           format: password
 *           example: "********"
 *         role:
 *           type: string
 *           enum: [superadmin, admin]
 *           example: "admin"
 *     Gym:
 *       type: object
 *       required:
 *         - name
 *         - ownerId
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "파워 휘트니스"
 *         dbName:
 *           type: string
 *           example: "gym_파워_휘트니스"
 *         ownerId:
 *           type: integer
 *           example: 1
 *         owner:
 *           $ref: '#/components/schemas/User'
 *     GymAdmin:
 *       type: object
 *       required:
 *         - userId
 *         - gymId
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 2
 *         gymId:
 *           type: integer
 *           example: 1
 *         user:
 *           $ref: '#/components/schemas/User'
 *         gym:
 *           $ref: '#/components/schemas/Gym'
 */

// Core DB 스키마 정의
const coreSchemas = {
  User: {
    type: 'object',
    required: ['email', 'name', 'password', 'role'],
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      email: {
        type: 'string',
        format: 'email',
        example: 'admin@example.com',
      },
      name: {
        type: 'string',
        example: '관리자',
      },
      password: {
        type: 'string',
        format: 'password',
        example: '********',
      },
      role: {
        type: 'string',
        enum: ['superadmin', 'admin'],
        example: 'admin',
      },
    },
  },
  Gym: {
    type: 'object',
    required: ['name', 'ownerId'],
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
  GymAdmin: {
    type: 'object',
    required: ['userId', 'gymId'],
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      userId: {
        type: 'integer',
        example: 2,
      },
      gymId: {
        type: 'integer',
        example: 1,
      },
    },
  },
};

module.exports = coreSchemas;