import { createSignal } from "solid-js";

export function Counter() {
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
