import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getFromStorage } from './lib/storage';

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  // const accessToken = request.cookies.get('accessToken');
  const accessToken = getFromStorage('userInfo');

  if (accessToken) {
    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/signup/:path*', '/signup'],
};
