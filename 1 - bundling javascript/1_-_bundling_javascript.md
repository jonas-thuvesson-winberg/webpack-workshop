[go back]: ../readme.md

[Go back]

## Part 1 - Creating a build

1. Move to the folder **_1 - start-template_**.
2. Run "`npm install`". This uses the packages defined under `devDependencies` in **_package.json_**. __Note__: All the required packages have been added in advance for this workshop for convinience's sake, by using `npm install --save-dev <package-name>`.
3. Open up the folder in _VS Code_ using "`code .`" (note that you also can do "`code </path/to/folder>`").

### Adding JavaScript Bundling

#### Basic bundling

In Webpack everything revolves around bundling JavaScript code into a package. We need an [entrypoint](https://webpack.js.org/concepts/#entry) for the code we want to bundle. In our case it is `index.js`, under **_src_**.

Webpack uses configuration files that are, in themself, JavaScript files. We have one configuration file for Webpack in this project called `webpack.config.js`. We need to tell webpack the [entrypoint](https://webpack.js.org/concepts/#entry), and how the javascript should be packaged using a [loader](https://webpack.js.org/concepts/#loaders).

1. Open up `webpack.config.js`.
2. Under `entry`, put `path.join(__dirname, 'src', 'index')`. This uses Node's [`path`](https://nodejs.org/api/path.html) module to look for **/src/index/** in the application's root folder.
3. The [output](https://webpack.js.org/configuration/output/) node takes a configuration object. We will use the [filename](https://webpack.js.org/configuration/output/#output-filename) and [path](https://webpack.js.org/configuration/output/#output-path) options in this example. Write `filename: 'main.js'` inside curly brackets (`{}`). This is the name of the JavaScript bundle that is the result of the packaging process. You also should provide the output path by writing `path: path.resolve(__dirname, 'dist')`. This resolves the absolute path to dist. You can read more [here](https://webpack.js.org/configuration/output/#output-path).
   In the end you should have something like this:

```
output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
}
```

4. If you run the code now using `npm run build`, you should see a file _main.js_ in **_/dist/_**.

#### Adding Babel for better browser support

Babel is a tool for compiling (or transpiling) modern JavaScript into a format compatible with different browsers and browser versions. Webpack has a loader that leverages the power of Babel.

1. Babel can be configured i different ways. We are going to use a separete config file. Add a new file, _.babelrc_, to the root of the project (**_1 - start-template_**). Open it and put in the following code:

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "modules": false,
        "debug": true
      }
    ]
  ]
}
```
The [preset-env](https://babeljs.io/docs/en/babel-preset-env) is a general (smart) preset, which allows for different outputs based on your needs.
`"useBuiltIns": "entry"` tells Babel to replace the general purpose Babel polyfill with the required polyfills based on environment. Read about [polyfills](https://en.wikipedia.org/wiki/Polyfill_(programming)) here, and about [useBuiltIns here](https://babeljs.io/docs/en/babel-preset-env#usebuiltins). 

`"modules": false` tells Babel to not transform [ES2015 (or ES6) module format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to another module format. In this case we don't want this transformation, since we want Webpack to be able to perform tree shaking (more on this later). Webpack does this based on unused imports (`import <entity> from 'mymodule'`). It then handles the transformation of these modules itself. Hence we don't want (or need) Babel to do this task. If you would use Babel on it's own it would be a different story.

`"debug": true` tells Babel to output the exact plugins it ends up using in the compilation process of your code. This requires an extra step of Webpack though, as we will see soon.

2. Add this entry under `loaders` in __webpack.config.js__:
```

```
For more info on the options used to configure the babel loader see [this link](https://babeljs.io/docs/en/babel-preset-env#options).

[Go back]
