// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { queryClient, trpc } from "~/utils/trpc";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Solid Start Starter</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <trpc.Provider queryClient={queryClient}>
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </trpc.Provider>
      </Body>
    </Html>
  );
}
