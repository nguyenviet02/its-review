export { default } from 'next-auth/middleware';

export const config = { matcher: ['/super-admin', '/admin', '/staff'] };
