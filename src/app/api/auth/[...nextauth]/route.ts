import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import * as msal from "@azure/msal-node";

import AzureADProvider, { AzureADProfile } from "next-auth/providers/azure-ad";

import { env } from "process";

const clientId = env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID;
const clientSecret = env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET;
const tenantId = env.NEXT_PUBLIC_AZURE_AD_TENANT_ID;

declare module "next-auth" {
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

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      name?: string | null;
      email?: string | null;
      roles?: string[];
    };
  }
}

const authority = `https://login.microsoftonline.com/${tenantId}`;

const msalConfig = {
  auth: {
    clientId: clientId || "",
    authority,
    clientSecret: clientSecret || "",
    knownAuthorities: [authority],
    redirectUri: "/",
  },
  cache: {
    // Optional
    cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
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

const generateApiAccessToken = async (refreshToken) =>
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
      client_id: clientId || "azure-ad-client-id",
      client_secret: clientSecret || "azure-ad-client-secret",
      grant_type: "refresh_token",
      refresh_token: token?.refreshToken as string,
    });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body,
    });

    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }

    const refreshToken = refreshedTokens?.refresh_token as string;
    if (refreshToken) {
      token.apiTokenDetails = await generateApiAccessToken(refreshToken);
    }

    return {
      ...token,
      accessToken: refreshedTokens.id_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
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
            "api://9aab055b-cfde-451f-9ddd-eb18a95778f7/Todolist.ReadWrite openid email profile User.Read  offline_access",
        },
      },
      httpOptions: { timeout: 10000 },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the access_token, expires_at & refresh_token to the token right after signin
      if (account && account.access_token && account.expires_at && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at * 1000;

        const res = await fetch(
          `${env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/users/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.accessToken}`,
            },
          },
        );
        const userData = await res.json();
        token.user = userData;
      }

      if (Date.now() < token.accessTokenExpires) {
        token.apiTokenDetails = await generateApiAccessToken(
          token.refreshToken,
        );
        return token;
      }

      return refreshAccessToken(token) ?? {};
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = token?.user;
        session.accessToken = token?.accessToken as string;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
