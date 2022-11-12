import { createSignal } from "solid-js";
import type { RouteDataArgs } from "solid-start";
import { createRouteData, useRouteData } from "solid-start";
import { client } from "~/utils/trpc";

export function routeData(_: RouteDataArgs) {
  return createRouteData(async () => {
    return await client.hello.query({ name: "Nir" });
  });
}

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button
      class="border bg-gray-300 p-5"
      type="button"
      onClick={() => {
        setCount(count() + 1);
      }}
    >
      {count()}
    </button>
  );
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
