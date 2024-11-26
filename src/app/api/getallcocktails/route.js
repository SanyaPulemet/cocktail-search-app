import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cocktails = await prisma.cocktail.findMany();
    return NextResponse.json(cocktails);
  } catch (error) {
    console.error('getallcocktails error', error);
    return NextResponse.json({ error: 'getallcocktails error' }, { status: 500 });
  }
}