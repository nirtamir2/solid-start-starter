import "solid-devtools";
import { useLocator } from "solid-devtools";
import { StartClient, mount } from "solid-start/entry-client";

useLocator({
  targetIDE: "webstorm",
});

mount(() => <StartClient />, document);
