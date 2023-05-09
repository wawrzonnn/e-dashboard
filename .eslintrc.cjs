module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
