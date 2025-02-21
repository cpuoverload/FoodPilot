import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  ignores: [
    // Ignore build directories and output files
    "dist/*",
    "build/*",
    "out/*",
    "public/*",
    "coverage/*",

    // Ignore node_modules directory
    "node_modules/*",

    // Ignore TypeScript compilation output directories
    "lib/*",
    "esm/*",
    "cjs/*",
    "types/*",

    // Ignore log files
    "logs/*",
    "*.log",

    // Ignore environment files
    ".env",
    ".env.*", // Matches .env.development, .env.production etc.

    // Ignore temporary files and cache
    "*.tmp",
    "*.temp",
    "*.cache",
    ".cache/*",
    "tmp/*",
    "temp/*",
    ".vscode/*",
    ".idea/*",
    ".DS_Store",

    // Ignore documentation and static files
    "*.md",
    "docs/*",
    "images/*",
    "*.png",
    "*.jpg",
    "*.jpeg",
    "*.gif",
    "*.svg",

    // Ignore configuration file backups
    "*.bak",
    "*.backup",

    // Ignore test results and reports
    "test-results/*",
    "*.test.js.snap",
    "*.test.ts.snap",
    "jest/*",
    "__snapshots__/*",

    // Ignore dependency lock files
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",

    // Ignore configuration files
    "*.config.js",
    "*.config.ts",
    "webpack.config.js",
    "rollup.config.js",
    "vite.config.js",
    "babel.config.js",
    ".eslintrc.js",
    ".prettierrc.js",

    // Ignore specific language and framework generated files
    "*.min.js",
    "*.min.css",
    "*.map",
    "*.swp",
    "*.swo",
  ],
});
