import {useRouteData, RouteDataArgs} from "solid-start";
import {createResource} from "solid-js";
import {client} from "~/utils/trpc";

export function routeData({params}: RouteDataArgs) {
    const [data] = createResource(async () => {
        return await client.hello.query({name: "Nir"})
    });
    return data;
}

export default function Home() {
    const routerData = useRouteData<typeof routeData>()
    return <div class="font-bold text-2xl text-gray-500">Hello World! {routerData.latest}</div>;
}
