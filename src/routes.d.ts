declare module "routes-gen" {
  export type RouteParams = {
    "/": Record<string, never>;
  };

  export function route<
    T extends
      | ["/"]
  >(...args: T): typeof args[0];
}
