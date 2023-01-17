declare module "routes-gen" {
  export type RouteParams = {
    "/hello": Record<string, never>;
    "/": Record<string, never>;
  };

  export function route<T extends ["/hello"] | ["/"]>(
    ...args: T
  ): (typeof args)[0];
}
