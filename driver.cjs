const path = require("path");
const { exec } = require("child_process");
const appDirectory = ".";
const defaultOutputPath = `${appDirectory}/src/routes.d.ts`;
const watchPaths = async () => [
  `${appDirectory}/routes/**/*.{ts,tsx,js,jsx}`,
];
const parseRoutes = (routes, parentPath) => routes
    .map((item) => {
      var _a;
      const path = `${parentPath !== null && parentPath !== void 0 ? parentPath : ""}${(_a = item.path) !== null && _a !== void 0 ? _a : ""}`;
      return [
        {
          path: (path.endsWith("/") && path !== "/"
              ? path.slice(0, -1)
              : path).replace(/\/\/+/g, "/"),
        },
        ...(item.children ? parseRoutes(item.children, `${path}/`) : []),
      ];
    })
    .flat()
    .filter((route, index, routes) => routes.findIndex((comparedRoute) => comparedRoute.path === route.path) === index)
    .filter((item) => Boolean(item.path) && !item.path.includes("/*"));
const routes = async () => {
  const scriptPath = path.join(__dirname, 'node_modules', 'solid-start', 'bin.cjs');
  const parsedRoutes = await new Promise(async (resolve) => {
    exec(`node ${scriptPath} routes`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      const routes = JSON.parse(stdout);
      resolve(routes);
    });
  });
  if (parsedRoutes.length === 0) {
    throw new Error('Couldn\'t parse routes. This may be due to breaking changes in "solid-start".');
  }
  return parsedRoutes;
};


module.exports = {
  defaultOutputPath,
  watchPaths,
  routes
}