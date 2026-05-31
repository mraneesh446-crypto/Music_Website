import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({ success: true }, { status: 200 });
        
        // Clear the HttpOnly auth cookie
        response.cookies.set({
            name: "auth",
            value: "",
            httpOnly: true,
            path: "/",
            expires: new Date(0), // Expire immediately
        });

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
