import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base configuration for all JS files
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"] 
  },
  
  // Browser environment for most files
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { 
      globals: globals.browser 
    } 
  },
  
  // Node.js environment for webpack and other build files
  {
    files: [
      "webpack/**/*.js",
      "webpack.*.js", 
      "*.config.js",
      "*.config.mjs"
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs
      },
      ecmaVersion: 2022,
      sourceType: "commonjs"
    }
  }
]);