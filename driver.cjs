const path = require("path");
const { exec } = require("child_process");
const appDirectory = "./src";
const defaultOutputPath = `${appDirectory}/routes.d.ts`;
const watchPaths = async () => [
  `${appDirectory}/routes/**/*.{ts,tsx,js,jsx}`,
];
const routes = async () => {
  const scriptPath = path.join(__dirname, 'node_modules', 'solid-start', 'bin.cjs');
  const parsedRoutes = await new Promise(async (resolve) => {
    exec(`node ${scriptPath} routes`, (error, stdout, stderr) => {
      if (error != null) {
        console.error("error", error);
        return;
      }
      if(stderr != null){
        console.error("stderr", stderr);
        return;
      }
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