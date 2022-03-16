# Client side with ReactJS library and Typescript

## Introduction

In the client side, Typescript has been used to achieve a more structured and maintainable source code. ReactJS library which is one of the most important libraries for UI development alongside the other big names in the market, has been picked over to build the presentation layer of the application.

### ESLint

[ESLint](https://eslint.org/) is a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript and Typescript.

[.eslintrc.json file](<(https://eslint.org/docs/user-guide/configuring)>) (alternatively configurations can be written in Javascript or YAML as well) is used describe the configurations required for ESLint.

### Webpack

[Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to capable Front-end developers to experience a modular programming style and bundle JavaScript and CSS files for usage in a browser.

[webpack.config.js](https://webpack.js.org/configuration/) file has been used to describe the configurations required for webpack.

1.  **entry:** entry: ./src/client/index.tsx is where the application starts executing and Webpack starts bundling.
    Note: babel-polyfill is added to support async/await. Read more [here](https://babeljs.io/docs/en/babel-polyfill#usage-in-node-browserify-webpack).
2.  **output path and filename:** the target directory and the filename for the bundled output.
3.  **module loaders:** Module loaders are transformations that are applied on the source code of a module. We pass all the js file through [babel-loader](https://github.com/babel/babel-loader) to transform JSX to Javascript. CSS files are passed through [css-loaders](https://github.com/webpack-contrib/css-loader) and [style-loaders](https://github.com/webpack-contrib/style-loader) to load and bundle CSS files. Fonts and images are loaded through url-loader.
4.  **Dev Server:** Configurations for the webpack-dev-server which will be described in coming section.
5.  **plugins:** [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) is a webpack plugin to remove the build directory before building. [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) simplifies creation of HTML files to serve your webpack bundles. It loads the template (public/index.html) and injects the output bundle.

### Webpack dev server

[Webpack dev server](https://webpack.js.org/configuration/dev-server/) is used along with webpack. It provides a development server that enables live reloading for the client side code changes.

The devServer section of webpack.config.js contains the configuration required to run webpack-dev-server. [**Port**](https://webpack.js.org/configuration/dev-server/#devserver-port) specifies the Webpack dev server to listen on this particular port (3000 in this case). When [**open**](https://webpack.js.org/configuration/dev-server/#devserver-open) is set to true, it will automatically open the home page on start-up. [Proxying](https://webpack.js.org/configuration/dev-server/#devserver-proxy) URLs can be useful when you have a separate API backend development server, and you want to send API requests on the same domain.
