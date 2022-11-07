//#region pluginToMakeTailwindAndSortImportsWorkTogether
const pluginSortImports = require("@trivago/prettier-plugin-sort-imports");
const pluginTailwindcss = require("prettier-plugin-tailwindcss");

/** @type {import("prettier").Parser}  */
const typescriptParser = {
  ...pluginSortImports.parsers.typescript,
  parse: pluginTailwindcss.parsers.typescript.parse,
};

/** @type {import("prettier").Plugin}  */
const pluginToMakeTailwindAndSortImportsWorkTogether = {
  parsers: {
    typescript: typescriptParser,
  },
};
//#endregion

module.exports = {
  plugins: [
    /**
     * This is a workaround for making tailwind and sort-imports plugins work together
     * @See https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31#issuecomment-1195411734
     */
    pluginToMakeTailwindAndSortImportsWorkTogether,
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-packagejson"),
  ],
  // @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss#resolving-your-tailwind-configuration
  tailwindConfig: "./tailwind.config.cjs",
  // @see https://github.com/trivago/prettier-plugin-sort-imports
  importOrder: [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    // Internal modules
    "^@app/(.*)$",
    // TypeScript TSConfig path aliases
    "^@/(.*)$",
    // Relative imports
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
  ],
};
