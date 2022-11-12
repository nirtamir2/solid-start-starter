import type { RouteDataArgs } from "solid-start";
import { createRouteData, useRouteData } from "solid-start";
import { Counter } from "~/components/Counter";
import { client } from "~/utils/trpc";

export function routeData(_: RouteDataArgs) {
  return createRouteData(async () => {
    return await client.hello.query({ name: "Nir" });
  });
}

export default function Home() {
  const routerData = useRouteData<typeof routeData>();
  return (
    <div class="flex h-screen flex-col">
      <div class="text-2xl font-bold text-gray-500">
        Hello World! {routerData.latest}
      </div>

      <Counter />
    </div>
  );
}
