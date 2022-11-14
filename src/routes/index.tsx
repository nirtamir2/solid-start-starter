import { Suspense } from "solid-js";
import type { RouteDataArgs } from "solid-start";
import { createRouteData, useRouteData } from "solid-start";
import { Counter } from "~/components/Counter";
import { client } from "~/utils/trpc";

export function routeData(_: RouteDataArgs) {
  return createRouteData(async () => {
    return await client.hello.query({ name: "World" });
  });
}

export default function Home() {
  const greeting = useRouteData<typeof routeData>();

  return (
    <div class="flex h-screen flex-col items-center justify-center gap-4">
      <h1 class="text-center text-4xl font-bold text-gray-900">
        Solid Start Starter
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <div class="text-center text-2xl font-bold text-gray-500">
          {greeting()}
        </div>
      </Suspense>
      <Counter />
    </div>
  );
}
