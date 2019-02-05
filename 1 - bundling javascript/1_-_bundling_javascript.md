[Go back]: ../readme.md


[Go back]

## Part 1 - Creating a build

1. Move to the folder __*1 - start-template*__.
2. Run "`npm install`". This uses the packages defined under `devDependencies` in __*package.json*__.
3. Open up the folder in *VS Code* using "`code .`" (note that you also can do "`code </path/to/folder>`").

### Adding JavaScript Bundling

In Webpack everything revolves around bundling JavaScript code into a package. We need an [entrypoint](https://webpack.js.org/concepts/#entry) for the code we want to bundle. In our case it is `index.js`, under __*src*__.

Webpack uses configuration files that are, in themself, JavaScript files. We have one configuration file for Webpack in this project called `webpack.config.js`. We need to tell webpack the [entrypoint](https://webpack.js.org/concepts/#entry), and how the javascript should be packaged using a [loader](https://webpack.js.org/concepts/#loaders).

1. Open up `webpack.config.js`.
2. under entry, put 
[...]

blabla Babel for more info on the options used to configure the babel loader see [this link](https://babeljs.io/docs/en/babel-preset-env#options).

[Go back]
