[Go back]: ../readme.md

[Go back]

## Part 1 - Creating a build

1. Move to the folder __*1 - start-template*__.
2. Run "`npm install`". This uses the packages defined under `devDependencies` in __*package.json*__.
3. Open up the folder in *VS Code* using "`code .`" (note that you also can do "`code </path/to/folder>`").

### Adding JavaScript Bundling

#### Basic bundling
In Webpack everything revolves around bundling JavaScript code into a package. We need an [entrypoint](https://webpack.js.org/concepts/#entry) for the code we want to bundle. In our case it is `index.js`, under __*src*__.

Webpack uses configuration files that are, in themself, JavaScript files. We have one configuration file for Webpack in this project called `webpack.config.js`. We need to tell webpack the [entrypoint](https://webpack.js.org/concepts/#entry), and how the javascript should be packaged using a [loader](https://webpack.js.org/concepts/#loaders).

1. Open up `webpack.config.js`.
2. Under `entry`, put `path.join(__dirname, 'src', 'index')`. This uses Node's [`path`](https://nodejs.org/api/path.html) module to look for __/src/index/__ in the application's root folder. 
3. The [output](https://webpack.js.org/configuration/output/) node takes a configuration object. We will use the [filename](https://webpack.js.org/configuration/output/#output-filename) and [path](https://webpack.js.org/configuration/output/#output-path) options in this example. Write `filename: 'main.js'` inside curly brackets (`{}`). This is the name of the JavaScript bundle that is the result of the packaging process. You also should provide the output path by writing `path: path.resolve(__dirname, 'dist')`. This resolves the absolute path to dist. You can read more [here](https://webpack.js.org/configuration/output/#output-path).
In the end you should have something like this:
```
output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
}
```
4. If you run the code now using `npm run build`, you should see a file *main.js* in __*/dist/*__.

#### Adding Babel for better browser support
Babel is a tool for compiling (or transpiling) modern JavaScript into a format compatible with different browsers and browser versions. When 


...
more info on the options used to configure the babel loader see [this link](https://babeljs.io/docs/en/babel-preset-env#options).

[Go back]
