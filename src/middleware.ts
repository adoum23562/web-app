import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/cart', '/checkout', '/orders'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'));
  if (!isProtected) return NextResponse.next();

  // Supabase stores the session in a cookie named sb-<project>-auth-token
  // We don't need to validate it here — just check it exists.
  // The API routes use the service role key for DB access anyway.
  const cookies = request.headers.get('cookie') ?? '';
  const hasSession = cookies.includes('-auth-token=') || cookies.includes('-auth-token.0=');

  if (!hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/cart/:path*', '/checkout', '/checkout/:path*', '/orders/:path*'],
};
