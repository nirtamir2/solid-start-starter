import { onMount } from "solid-js";
import { trpc } from "~/utils/trpc";

export default function Home() {
  const res = trpc.hello.useQuery(() => ({ name: "from tRPC" }));
  const mutExample = trpc.random.useMutation();

  onMount(() => {
    mutExample.mutateAsync({ num: 5 }).then(console.log);
  });

  return <div class="font-bold text-2xl text-gray-500">{res.isLoading ? "loading" : res.data}</div>;
}
