import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import * as msal from '@azure/msal-node';

import AzureADProvider from 'next-auth/providers/azure-ad';

import { env } from 'process';

const clientId = env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID;
const clientSecret = env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET;
const tenantId = env.NEXT_PUBLIC_AZURE_AD_TENANT_ID;

const COOKIES_LIFE_TIME = 24 * 60 * 60;
const COOKIE_PREFIX = process.env.NODE_ENV === 'production' ? '__Secure-' : '';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
    user?: {
      id: string;
      username: string;
      email: string;
      organizationId: number;
      department: string;
      jobPosition: string;
      roles: string[];
      createdAt: string;
      updatedAt: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: {
      id: string;
      username: string;
      email: string;
      organizationId: number;
      department: string;
      jobPosition: string;
      roles: string[];
      createdAt: string;
      updatedAt: string;
    };
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    apiTokenDetails?: {
      accessToken?: string;
      expiresOn?: string;
    };
    error?: string;
  }
}

const authority = `https://login.microsoftonline.com/${tenantId}`;

const msalConfig = {
  auth: {
    clientId: clientId || '',
    authority,
    clientSecret: clientSecret || '',
    knownAuthorities: [authority],
    redirectUri: '/',
  },
  system: {
    loggerOptions: {
      // loggerCallback(loglevel: number, message: string, containsPii: boolean) {
      //   console.log(message);
      // },
      allowPlatformBroker: false,
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

const generateApiAccessToken = async (refreshToken: string) =>
  await cca
    .acquireTokenByRefreshToken({
      scopes: [`api://9aab055b-cfde-451f-9ddd-eb18a95778f7/Todolist.ReadWrite`],
      refreshToken,
    })
    .catch((err) => console.log(err));

async function refreshAccessToken(token: JWT) {
  try {
    const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const body = new URLSearchParams({
      client_id: clientId || 'azure-ad-client-id',
      client_secret: clientSecret || 'azure-ad-client-secret',
      grant_type: 'refresh_token',
      scope:
        'api://9aab055b-cfde-451f-9ddd-eb18a95778f7/Todolist.ReadWrite openid email profile User.Read offline_access',
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

    const refreshToken = refreshedTokens?.refresh_token as string;
    if (refreshToken) {
      const apiToken = await generateApiAccessToken(refreshToken);
      token.apiTokenDetails = apiToken
        ? {
            accessToken: apiToken.accessToken,
            expiresOn: apiToken.expiresOn?.toISOString(),
          }
        : { accessToken: undefined };
    }

    return {
      ...token,
      accessToken: refreshedTokens.id_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authConfig = {
  providers: [
    AzureADProvider({
      clientId: `${clientId}`,
      clientSecret: `${clientSecret}`,
      tenantId: `${tenantId}`,
      authorization: {
        params: {
          scope:
            'api://9aab055b-cfde-451f-9ddd-eb18a95778f7/Todolist.ReadWrite openid email profile User.Read  offline_access',
        },
      },
      issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,
      httpOptions: { timeout: 15000 },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the access_token, expires_at & refresh_token to the token right after signin
      if (account && account.access_token && account.expires_at && user) {
        const apiToken = await generateApiAccessToken(
          account.refresh_token as string,
        );

        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at * 1000;
        token.apiTokenDetails = apiToken
          ? {
              accessToken: apiToken.accessToken,
              expiresOn: apiToken.expiresOn?.toISOString(),
            }
          : {};

        let userData = null;
        try {
          console.time('jwt');
          const res = await fetch(
            `${env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/users/me`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiToken?.accessToken}`,
              },
            },
          );
          userData = await res.json();
          console.timeEnd('jwt');
          token.user = userData;
        } catch (error) {
          console.log(error);
        }
      }

      if (
        Date.now() < Number(token.accessTokenExpires) &&
        Date.now() <
          new Date(token.apiTokenDetails?.expiresOn || '').getTime() &&
        token?.apiTokenDetails?.accessToken
      ) {
        return token;
      }

      return refreshAccessToken(token) ?? {};
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = token?.user;
        session.accessToken = token?.apiTokenDetails?.accessToken as string;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `${COOKIE_PREFIX}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `${COOKIE_PREFIX}next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `${COOKIE_PREFIX}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: `${COOKIE_PREFIX}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: COOKIES_LIFE_TIME,
      },
    },
    state: {
      name: `${COOKIE_PREFIX}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: COOKIES_LIFE_TIME,
      },
    },
    nonce: {
      name: `${COOKIE_PREFIX}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
} satisfies NextAuthOptions;
