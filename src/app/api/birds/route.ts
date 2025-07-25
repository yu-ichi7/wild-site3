import { NextResponse } from 'next/server';
import birds from '@/data/birds.json';

export async function GET() {
  return NextResponse.json(birds);
}