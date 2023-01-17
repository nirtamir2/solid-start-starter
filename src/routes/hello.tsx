import { A } from "@solidjs/router";
import { route } from "routes-gen";

export default function HelloPage() {
  return (
    <div class="flex w-full items-center justify-center p-24">
      <A href={route("/")} class="text-center text-2xl font-bold text-gray-500">
        Back to home
      </A>
    </div>
  );
}
