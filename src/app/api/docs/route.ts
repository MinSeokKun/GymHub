// pages/api/docs/swagger.js
import { NextResponse } from 'next/server';
import swaggerSpec from '@/../docs/swagger/index';

export async function GET() {
  return NextResponse.json(swaggerSpec);
}