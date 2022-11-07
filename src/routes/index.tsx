import { createResource } from "solid-js";
import type { RouteDataArgs } from "solid-start";
import { useRouteData } from "solid-start";
import { client } from "~/utils/trpc";

export function routeData(_: RouteDataArgs) {
  const [data] = createResource(async () => {
    return await client.hello.query({ name: "Nir" });
  });
  return data;
}

export default function Home() {
  const routerData = useRouteData<typeof routeData>();
  return (
    <div class="text-2xl font-bold text-gray-500">
      Hello World! {routerData.latest}
    </div>
  );
}
