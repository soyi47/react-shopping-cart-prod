module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true,
  },
  parser: "@babel/eslint-parser",
  plugins: ["prettier"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "max-depth": ["error", 3],
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "no-shadow": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        scss: "never",
      },
    ],
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": ["off"],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "mock/*.js",
          "**/webpack.*.js",
          "*.config.js",
          "**/*.test.js",
        ],
      },
    ],
    "dot-notation": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-alert": "off",
  },

  settings: {
    "import/resolver": {
      webpack: {
        config: "./webpack/webpack.common.js",
      },
    },
  },
};
