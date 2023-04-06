import { A } from "@solidjs/router";
import { route } from "routes-gen";
import { Suspense } from "solid-js";
import GithubIcon from "~/assets/github.svg";
import SolidIcon from "~/assets/solid.svg";
import { Counter } from "~/components/Counter";
import { trpc } from "~/utils/trpc";

export default function Home() {
  const greeting = trpc.hello.useQuery(() => {
    return { name: "World" };
  });

  return (
    <div class="flex h-screen flex-col items-center justify-center gap-4">
      <h1 class="text-center text-4xl font-bold text-gray-900">
        Solid Start Starter
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <A
          href={route("/hello")}
          class="text-center text-2xl font-bold text-gray-500"
        >
          {greeting.data}
        </A>
      </Suspense>
      <SolidIcon height={200} width={200} />
      <Counter />
      <A
        href="https://github.com/nirtamir2/solid-start-starter"
        class="flex items-center gap-2 text-gray-500"
        target="_blank"
      >
        <GithubIcon height={24} width={24} />
        <span>solid-start-starter</span>
      </A>
      <A
        href="https://start.solidjs.com/"
        class="flex items-center gap-2 text-gray-500"
        target="_blank"
      >
        SolidStart Docs
      </A>
    </div>
  );
}
