import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow unescaped entities in JSX (common in generated content)
      "react/no-unescaped-entities": "warn",
      // Allow unused variables (common in generated templates)
      "@typescript-eslint/no-unused-vars": "warn",
      // Allow any in generated content
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    // Special rules for generated conversion pages
    files: ["src/app/convert/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
