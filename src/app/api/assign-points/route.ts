// app/api/assign-points/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const { referrerId } = await req.json();

    if (!referrerId) {
        return NextResponse.json({ message: 'Referrer ID not provided' }, { status: 400 });
    }

    try {
        const referrer = await prisma.user.findUnique({
            where: { id: referrerId },
        });

        if (!referrer) {
            return NextResponse.json({ message: 'Referrer not found' }, { status: 404 });
        }

        await prisma.user.update({
            where: { id: referrerId },
            data: {
                points: {
                    increment: 20,
                },
            },
        });

        await prisma.referral.create({
            data: {
                referrerId,
                referredId: userId,
            },
        });

        return NextResponse.json({ message: 'Points added to referrer' });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
