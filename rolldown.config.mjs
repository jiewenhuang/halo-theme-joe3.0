import { readdirSync } from "node:fs";
import { join as joinPath, resolve as resolvePath } from "node:path";
import postcss from "rollup-plugin-postcss";

const jsRootDir = resolvePath(import.meta.dirname, "templates", "assets", "js");
const lessRootDir = resolvePath(import.meta.dirname, "templates", "assets", "css");
const jsFiles = readdirSync(jsRootDir).filter((file) => file.endsWith(".js"));
const lessFiles = readdirSync(lessRootDir).filter((file) =>
  file.endsWith(".less")
);

const jsConfig = jsFiles.map((file) => ({
  input: joinPath(jsRootDir, file),
  output: {
    file: joinPath(jsRootDir, "min", file.replace(".js", ".min.js")),
    format: "iife",
    minify: true,
  },
  treeshake: false,
}));

const lessConfig = lessFiles.map((file) => ({
  input: joinPath(lessRootDir, file),
  output: {
    file: joinPath(lessRootDir, "min", file.replace(".less", ".min.css")),
    minify: true,
  },
  plugins: [
    postcss({
      extract: true,
      minimize: true,
      extensions: [".less"],
      use: [["less", { javascriptEnabled: true }]],
    }),
  ],
}));

export default [...jsConfig, ...lessConfig];
