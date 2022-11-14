# Create JD App

This project was created using [Create JD App](https://github.com/OrJDev/create-jd-app).

It's a minimal opinionated solid-start starter that includes:

- [SolidStart](https://github.com/solidjs/solid-start)
- [Prisma](https://github.com/prisma/prisma)
- [tRPC](https://github.com/trpc/trpc)
- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss)
- [Upstash Ratelimit](https://github.com/upstash/ratelimit)
- Deployment to [Vercel](https://vercel.com/)
- [pnpm](https://pnpm.io/) package manager
- [solid-devtools](https://github.com/thetarnav/solid-devtools) integration for webstorm (you can change to `targetIDE` to `vscode`)
- ESLint configured for solid-start
- Prettier configuration
- Pre-commit hooks with husky and lint-staged

### Environment Variables

- `ENABLE_VC_BUILD` set to `1` .
- Prisma: `DATABASE_URL` set to your `database url`.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from [Upstash Ratelimit](https://github.com/upstash/ratelimit)
