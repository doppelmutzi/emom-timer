module.exports = {
  extends: [
    "prettier",
    "prettier/standard",
    "prettier/react",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["prettier", "react-hooks"],
  rules: {
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/display-name": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": 0,
    "no-unused-vars": 0,
    // import React from "react" no more required for jsx in React 17
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};
