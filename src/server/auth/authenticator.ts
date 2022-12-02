import type { User } from "@prisma/client";
import { Authenticator } from "@solid-auth/core";
import { GoogleStrategy } from "@solid-auth/socials";
import { serverEnv } from "~/env/serverEnv";
import { sessionStorage } from "~/utils/auth";
import { getBaseUrl } from "~/utils/getBaseUrl";
import { prisma } from "../db/client";

export const authenticator = new Authenticator<User>(sessionStorage).use(
  new GoogleStrategy(
    {
      clientID: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
      callbackURL: `${getBaseUrl()}/api/auth/google/callback`,
    },
    async ({ profile }) => {
      const existUser = await prisma.user.findUnique({
        where: {
          id: profile.id,
        },
      });
      if (existUser != null) {
        return existUser;
      }

      return await prisma.user.create({
        data: {
          id: profile.id,
          displayName: profile.displayName,
          picture: profile._json.picture,
          isVerified: false,
        },
      });
    }
  )
);
