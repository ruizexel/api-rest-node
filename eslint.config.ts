import js from "@eslint/js";
import globals from "globals";
import { defineConfig, type Config } from "eslint/config";
import unusedImports from "eslint-plugin-unused-imports";
import { configs, plugins, rules } from "eslint-config-airbnb-extended";

// Reglas base de JavaScript + Airbnb
const jsConfig = [
  { name: "js/recommended", ...js.configs.recommended }, // reglas "de fábrica" de JS
  plugins.stylistic,                                     // plugin de estilo (espacios, comillas)
  plugins.importX,                                       // plugin para ordenar/validar imports
  plugins.node,                                          // plugin para código Node
  ...configs.base.recommended,                           // las reglas de Airbnb base
];

// Soporte TypeScript + reglas Airbnb para TS
const typescriptConfig = [
  plugins.typescriptEslint,                              // plugin de typescript-eslint
  ...configs.base.typescript,                            // Airbnb adaptado a TS
  rules.typescript.typescriptEslintStrict,               // reglas TS más estrictas
];

// Tus ajustes personales
const customConfig: Config = {
  name: "custom/overrides",
  files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
  plugins: { "unused-imports": unusedImports },          // registra el plugin
  languageOptions: {
    globals: { ...globals.browser, ...globals.node },    // variables globales permitidas
  },
  rules: {
    "no-unused-vars": "off",                             // apagamos la regla de JS
    "@typescript-eslint/no-unused-vars": "off",          // apagamos la de TS (evita duplicados)
    "unused-imports/no-unused-imports": "warn",          // quita imports sin usar
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",                         // ignora variables que empiezan con _
        args: "after-used",
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
};

export default defineConfig([
  ...jsConfig,
  ...typescriptConfig,
  customConfig, // va al final para poder sobrescribir a Airbnb
]);