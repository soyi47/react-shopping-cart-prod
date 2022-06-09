const path = require("path");

const { resolve } = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.s(a|c)ss$/,
      include: path.resolve(__dirname, "../"),
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              auto: true,
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
        },
        "sass-loader",
      ],
    });
    config.resolve.extensions.push(".scss");
    const alias = {
      "@": resolve(__dirname, "../src"),
      "@hooks": resolve(__dirname, "../src/hooks"),
      "@components": resolve(__dirname, "../src/components"),
      "@scss": resolve(__dirname, "../src/scss"),
      "@home": resolve(__dirname, "../src/pages/home"),
      "@cart": resolve(__dirname, "../src/pages/cart"),
      "@order-list": resolve(__dirname, "../src/pages/order-list"),
      "@product-detail": resolve(__dirname, "../src/pages/product-detail"),
      "@redux": resolve(__dirname, "../src/redux"),
      "@assets": resolve(__dirname, "../src/assets"),
      "@mock": resolve(__dirname, "../mock"),
      "@utils": resolve(__dirname, "../src/utils"),
    };
    config.resolve.alias = Object.assign(config.resolve.alias, alias);

    const rules = config.module.rules;
    const fileLoaderRule = rules.find((rule) => rule.test.test(".svg"));
    fileLoaderRule.exclude = /\.svg$/;

    rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          },
        },
      ],
    });

    return config;
  },
};
