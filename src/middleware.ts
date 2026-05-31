import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_key_change_me_in_prod");

export async function middleware(request: NextRequest) {
    const authCookie = request.cookies.get("auth");

    if (!authCookie?.value) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
        await jwtVerify(authCookie.value, JWT_SECRET);
        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - sign-in (Login page)
         * - sign-up (Register page)
         * - images and common static extensions
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sign-in|sign-up|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
