import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from "eslint-plugin-simple-import-sort"
import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt(
  {
    ignores: ["**/.nuxt/", "**/.output/", "dist/"],
  },
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "prettier/prettier": "warn",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
);
