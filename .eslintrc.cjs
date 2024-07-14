module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "react-compiler",
    "react-refresh",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "react-compiler/rules-of-hooks": "off",
    "react-compiler/exhaustive-deps": "off",
    "react-compiler/react-compiler": "error",
    "react/prop-types": "error",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier":  ["error", { endOfLine: "lf" }]
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
