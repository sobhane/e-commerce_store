/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [], // Required by NextAuthConfig type
  callbacks: {
    async authorized({ request, auth }) {
      

      // Check for session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        // Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();
        // Clone the req headers
        const newRequestHeaders = new Headers(request.headers);

        // Create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        // Set newly generated sessionCartId in the response cookie
        response.cookies.set("sessionCartId", sessionCartId);

        console.log(response.headers)
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;
