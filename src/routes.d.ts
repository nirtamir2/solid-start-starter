declare module "routes-gen" {
  export type RouteParams = {
    "/:param": { "param": string };
    "/": Record<string, never>;
    "/api/cool": Record<string, never>;
    "/api/cool/:param": { "param": string };
  };

  export function route<
    T extends
      | ["/:param", RouteParams["/:param"]]
      | ["/"]
      | ["/api/cool"]
      | ["/api/cool/:param", RouteParams["/api/cool/:param"]]
  >(...args: T): typeof args[0];
}
