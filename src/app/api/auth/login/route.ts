import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_key_change_me_in_prod");

export async function POST(req: Request) {
    try {
        const { email, phone, password } = await req.json();

        if (!password || (!email && !phone)) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        // Find user
        let user = null;
        if (email) {
            user = await prisma.user.findUnique({ where: { email } });
        } else if (phone) {
            user = await prisma.user.findUnique({ where: { phone } });
        }

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT
        const token = await new SignJWT({ userId: user.id, email: user.email, phone: user.phone })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(JWT_SECRET);

        // Set HttpOnly cookie
        const response = NextResponse.json({ success: true }, { status: 200 });
        response.cookies.set({
            name: "auth",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
