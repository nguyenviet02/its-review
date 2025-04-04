// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { ROLES } from './types';

const rolesCanAccessAdmin = [ROLES.ADMIN, ROLES.SUPER_ADMIN];

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // If the user is not an admin or super-admin, redirect to denied page
    if (
      (request.nextUrl.pathname.startsWith('/admin') &&
        rolesCanAccessAdmin.filter((role) =>
          request.nextauth.token?.user?.roles?.includes(role),
        ).length === 0) ||
      !request.nextauth.token?.user?.id
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ['/admin', '/employee'],
};
