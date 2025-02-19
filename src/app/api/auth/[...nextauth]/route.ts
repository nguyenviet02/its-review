import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import AzureADProvider, { AzureADProfile } from 'next-auth/providers/azure-ad';

import { env } from 'process';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: {
      name?: string | null;
      email?: string | null;
      role?: string;
    };
  }
}

async function refreshAccessToken(token: JWT) {
  try {
    const url = `https://login.microsoftonline.com/${env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const body = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID || 'azure-ad-client-id',
      client_secret: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET || 'azure-ad-client-secret',
      scope: 'email openid profile User.Read offline_access',
      grant_type: 'refresh_token',
      refresh_token: token?.refreshToken as string,
    });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body,
    });

    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.id_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log('☠️ ~ refreshAccessToken ~ error:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authConfig = {
  providers: [
    AzureADProvider({
      clientId: `${env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}`,
      clientSecret: `${env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET}`,
      tenantId: `${env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
      authorization: {
        params: { scope: 'openid email profile User.Read  offline_access' },
      },
      httpOptions: { timeout: 10000 },
      async profile(profile: AzureADProfile) {
        let roleData;
        try {
          const res = await fetch('https://catfact.ninja/fact');
          roleData = await res.json();
        } catch (error) {
          console.log('error', error);
        }
        return {
          ...profile,
          role: roleData?.length > 0 ? 'admin' : 'user',
          id: profile.sub,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the id_token, expires_at &refresh_token to the token right after signin
      if (account && user) {
        return {
          accessToken: account.id_token,
          accessTokenExpires: account?.expires_at ? account.expires_at * 1000 : 0,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (Date.now() < Number(token.accessTokenExpires) - 100000 || 0) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token?.user?.role;
        session.user.name = token?.user?.name;
        session.user.email = token?.user?.email;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
