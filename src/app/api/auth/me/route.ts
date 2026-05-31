import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_key_change_me_in_prod");

export async function GET() {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get("auth");

        if (!authCookie?.value) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Verify token
        const { payload } = await jwtVerify(authCookie.value, JWT_SECRET);
        
        if (!payload.userId) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Fetch user from database
        const user = await prisma.user.findUnique({
            where: { id: payload.userId as string },
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                createdAt: true
            }
        });

        if (!user) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        return NextResponse.json({ authenticated: true, user }, { status: 200 });

    } catch (error) {
        console.error("Auth me error:", error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
