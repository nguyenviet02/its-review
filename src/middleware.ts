// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith('/admin') && request.nextauth.token?.user?.role !== 'admin') {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/staff') && request.nextauth.token?.user?.role !== 'admin' && request.nextauth.token?.user?.role !== 'staff') {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ['/admin', '/staff'] };
