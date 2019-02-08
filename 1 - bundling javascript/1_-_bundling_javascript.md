[go back]: ../readme.md

[Go back]

## Part 1 - Creating a build

1. Move to the folder **_1 - start-template_**.
2. Run "`npm install`". This uses the packages defined under `devDependencies` in **_package.json_**. **Note**: All the required packages have been added in advance for this workshop for convinience's sake, by using `npm install --save-dev <package-name>`.
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
`"useBuiltIns": "entry"` tells Babel to replace the general purpose Babel polyfill with the required polyfills based on environment. Read about [polyfills](<https://en.wikipedia.org/wiki/Polyfill_(programming)>) here, and about [useBuiltIns here](https://babeljs.io/docs/en/babel-preset-env#usebuiltins).

`"modules": false` tells Babel to not transform [ES2015 (or ES6) module format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to another module format. In this case we don't want this transformation, since we want Webpack to be able to perform tree shaking (more on this later). Webpack does this based on unused imports (`import <entity> from 'mymodule'`). It then handles the transformation of these modules itself. Hence we don't want (or need) Babel to do this task. If you would use Babel on it's own it would be a different story.

`"debug": true` tells Babel to output the exact plugins it ends up using in the compilation process of your code. This requires an extra step of Webpack though, as we will see soon.

Last but not least, add the following import statement to the top of our __*src/index.js*__ file, to tell Babel that we are actually using polyfills:
```
import '@babel/polyfill';
```

For more info on the options used to configure the Babel, see [this link](https://babeljs.io/docs/en/babel-preset-env#options).

3. We will now add another config file that is a standard format that helps Babel (and other JavaScript tools) which browsers you want to include support for. Add another file, _.browserslistrc_, to the project root. In this file you can add a list of queries (requirements) that needs to be fulfilled. These are then checked against [CanIUse](https://caniuse.com/).

Add the following lines to the file:

```
> 5% in SE
not ie <= 10
```

The first line says that we want to support browsers used by more than 5% of the users in Sweden. The second line says that we don't care about Internet Explorer older than 11.

You can read more about [the browserlist project here](https://github.com/browserslist/browserslist).

3. For all this to take effect we need to add a new entry in the `rules` node under `plugins`, in the **webpack.config.js** file:

```
{
    test: /\.js$/,
    include: [path.resolve(__dirname, 'src')],
    exclude: [path.resolve(__dirname, 'node_modules')],
    loader: 'babel-loader',
    query: {
        presets: ['@babel/preset-env']
    }
}
```
We want to transform and bundle the files in our *src* directory, but not the *node_modules* directory. Of course, referenced code from *node_modules* will be included in the final bundle.

4. We can now run our build by typing `npm run build` in the terminal. This command is defined in the *package.json* file, which in turn calls webpack. We have only installed webpack locally. If we would want to use it directly in the terminal (instead of an NPM script), we would have to install it globally. This is not really in the scope of this workshop, but you can read more about it in the [NPM documentation](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry).

You should see something similar to this:
```
Hash: 877f25771b7a2b807997
Version: webpack 4.29.3
Time: 853ms
Built at: 02/08/2019 9:32:02 AM
  Asset      Size  Chunks             Chunk Names
main.js  3.88 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/index.js] 110 bytes {main} [built]
```
Notice that we don't get the debug information from Babel. For this to work we need to rename our webpack config file to *webpack.config.babel.js*. You also need to change the NPM build script in *package.json* from `"build": "webpack --config webpack.config.js"``to `"build": "webpack --config webpack.config.babel.js"`. After doing this, run `npm run build` once again. 
Now your output will be different:
```
npm run build

> webpack-workshop@1.0.0 build C:\Programming\JavaScript\webpack-workshop\1 - bundling javascript\1 - start-template
> webpack --config webpack.config.babel.js

@babel/preset-env: `DEBUG` option

Using targets:
{}

Using modules transform: false

Using plugins:
  transform-template-literals {}
  transform-literals {}
  transform-function-name {}
  transform-arrow-functions {}
  transform-block-scoped-functions {}
  transform-classes {}
  transform-object-super {}
  transform-shorthand-properties {}
  transform-duplicate-keys {}
  transform-computed-properties {}
  transform-for-of {}
  transform-sticky-regex {}
  transform-dotall-regex {}
  transform-unicode-regex {}
  transform-spread {}
  transform-parameters {}
  transform-destructuring {}
  transform-block-scoping {}
  transform-typeof-symbol {}
  transform-new-target {}
  transform-regenerator {}
  transform-exponentiation-operator {}
  transform-async-to-generator {}
  proposal-async-generator-functions {}
  proposal-object-rest-spread {}
  proposal-unicode-property-regex {}
  proposal-json-strings {}
  proposal-optional-catch-binding {}
  transform-named-capturing-groups-regex {}

Using polyfills with `entry` option:

[C:\Programming\JavaScript\webpack-workshop\1 - bundling javascript\1 - start-template\webpack.config.babel.js] `import '@babel/polyfill'` was not found.
Hash: cef7049187e27aae1ebe
Version: webpack 4.29.3
Time: 681ms
Built at: 02/08/2019 9:44:07 AM
  Asset     Size  Chunks             Chunk Names
main.js  413 KiB    main  [emitted]  main
Entrypoint main = main.js
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {main} [built]
[./src/index.js] 137 bytes {main} [built]
    + 281 hidden modules
```


[Go back]
