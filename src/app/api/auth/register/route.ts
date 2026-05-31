import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { fullName, email, phone, password } = await req.json();

        if (!password || (!email && !phone)) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user exists
        if (email) {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return NextResponse.json({ error: "Email already registered" }, { status: 409 });
            }
        }
        if (phone) {
            const existingUser = await prisma.user.findUnique({ where: { phone } });
            if (existingUser) {
                return NextResponse.json({ error: "Phone number already registered" }, { status: 409 });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                fullName,
                email: email || undefined,
                phone: phone || undefined,
                password: hashedPassword,
            },
        });

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
