module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  "parserOptions": {
    "sourceType": "module"
  },
  rules: {
    quotes: "off",
    "max-len": "off",
    "require-jsdoc": "off",
    "object-curly-spacing": "off",
    "indent": "off"
  },
};
