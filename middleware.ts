import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/interviews', '/training'];
const publicRoutes = ['/', '/auth', '/403', '/unauthorized'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

