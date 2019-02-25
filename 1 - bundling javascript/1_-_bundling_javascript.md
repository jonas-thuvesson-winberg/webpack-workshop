[go back]: ../readme.md

[Go back]

## Part 1 - Creating a build

1. Move to the folder **_1 - start-template_**.
2. Run "`npm install`". This uses the packages defined under `devDependencies` in **_package.json_**. __Note__: All the required packages have been added in advance for this workshop for convenience's sake, by using `npm install --save <package-name>`.
3. Open up the folder in _VS Code_ using "`code .`" (note that you also can do "`code </path/to/folder>`").

### Adding JavaScript Bundling

#### Basic bundling

In Webpack everything revolves around bundling JavaScript code into a package. We need an [entrypoint](https://webpack.js.org/concepts/#entry) for the code we want to bundle. In our case it is `main.js`, under **_src_**.

Webpack uses configuration files that are, in themself, JavaScript files. We have one configuration file for Webpack in this project called `webpack.config.js`. We need to tell webpack the [entrypoint](https://webpack.js.org/concepts/#entry), and how the javascript should be packaged using a [loader](https://webpack.js.org/concepts/#loaders).

1. Open up `webpack.config.js`.
2. Under `entry`, replace the empty entry with `path.join(__dirname, 'src', 'main')`. This uses Node's [path](https://nodejs.org/api/path.html) module to look for **/src/main** (JavaScript module) in the application's root folder.
3. The [output](https://webpack.js.org/configuration/output/) node takes a configuration object. We will use the [filename](https://webpack.js.org/configuration/output/#output-filename) and [path](https://webpack.js.org/configuration/output/#output-path) options in this example. Write `filename: 'bundle.js'` inside the placeholder curly brackets (`{}`). This is the name of the JavaScript bundle that is the result of the packaging process. You also should provide the output path by writing `path: path.resolve(__dirname, 'dist')`. This resolves the absolute path to dist. You can read more [here](https://webpack.js.org/configuration/output/#output-path).
   In the end you should have something like this:

```
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
}
```

4. If you run the code now using `npm run build`, you should see a file _bundle.js_ in **_/dist/_**.

#### Adding Babel for better browser support

Babel is a tool for compiling (or transpiling) modern JavaScript into a format compatible with different browsers and browser versions. Webpack has a loader that leverages the power of Babel.

1. Babel can be configured in different ways. We are going to use a separate config file. Add a new file, _.babelrc_ (__note the dot in the beginning of the file__), to the root of the project (**_1 - start-template_**). Open it and put in the following code:

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

Babel uses a combination of plugins (transforms JavaScript) and [polyfills](https://en.wikipedia.org/wiki/Polyfill_(programming)) (injected code to allow for a missing browser feature).

`"useBuiltIns": "entry"` tells Babel to replace the general purpose Babel polyfill with the required polyfills based on environment. Read about [polyfills](<https://en.wikipedia.org/wiki/Polyfill_(programming)>) here, and about [useBuiltIns here](https://babeljs.io/docs/en/babel-preset-env#usebuiltins).

`"modules": false` tells Babel to not transform [ES2015 (or ES6) modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to another module format. In this case we don't want this transformation, since we want Webpack to be able to perform [tree shaking](https://en.wikipedia.org/wiki/Tree_shaking) (more on this later). Webpack does this based on unused imports (`import <entity> from 'mymodule'`). It then handles the transformation of these modules itself. Hence we don't want (or need) Babel to do this task. If you would use Babel on it's own it would be a different story.

`"debug": true` tells Babel to output the exact plugins it ends up using in the compilation process of your code. This requires an extra step of Webpack though, as we will see soon.

For this to work we also need to add the following import to the top of our __main.js__ file:
`import '@babel/polyfill';`

Since we use `entry` this will be transformed like this (example):
```
import "@babel/polyfill";
```
to (will differ based on environment)
```
import "core-js/modules/es7.string.pad-start";
import "core-js/modules/es7.string.pad-end";
```

For more info on the options used to configure Babel, see [this link](https://babeljs.io/docs/en/babel-preset-env#options).

3. We will now add another config file that is a standard format that helps Babel (and other JavaScript tools), tell which browsers you want to include support for. Add another file, _.browserslistrc_ (__again, note the dot__), to the project root. In this file you can add a list of queries (requirements) that needs to be fulfilled. These are then checked against [CanIUse](https://caniuse.com/).

Add the following lines to the file:

```
safari > 1
ie > 1
chrome > 1
firefox > 1
opera > 1
```

This list is unrealistically inclusive, since we aim to support all browser versions above version 1.
You can read more about [the browserslist project here](https://github.com/browserslist/browserslist).

3. For all this to take effect we need to add a new entry _inside_ the empty array in the `rules` node (under `module`), in the _webpack.config.js_ file:

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

We want to transform and bundle the files in our _src_ directory, but not the _node_modules_ directory. Of course, referenced code from _node_modules_ will be included in the final bundle.

4. We also need to change the name from _webpack.config.js_ to _webpack.config.babel.js_, for the debug information to be logged in the terminal.

4. We can now run our build by typing `npm run build` in the terminal. This command is defined in the _package.json_ file, which in turn calls webpack.

You should see something similar to this:

```
λ  npm run build

> webpack-workshop@1.0.0 build C:\Programming\JavaScript\webpack-workshop\1 - bundling javascript\2 - end-result
> webpack

@babel/preset-env: `DEBUG` option

Using targets:
{
  "chrome": "4",
  "firefox": "2",
  "ie": "5.5",
  "opera": "9",
  "safari": "3.1"
}

Using modules transform: false

Using plugins:
  transform-template-literals { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-literals { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-function-name { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-arrow-functions { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-block-scoped-functions { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-classes { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-object-super { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-shorthand-properties { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-duplicate-keys { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-computed-properties { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-for-of { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-sticky-regex { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-dotall-regex { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-unicode-regex { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-spread { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-parameters { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-destructuring { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-block-scoping { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-typeof-symbol { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-new-target { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-regenerator { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-exponentiation-operator { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-async-to-generator { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  proposal-async-generator-functions { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  proposal-object-rest-spread { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  proposal-unicode-property-regex { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  proposal-json-strings { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  proposal-optional-catch-binding { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }
  transform-named-capturing-groups-regex { "chrome":"4", "firefox":"2", "ie":"5.5", "opera":"9", "safari":"3.1" }

Using polyfills with `entry` option:

[C:\Programming\JavaScript\webpack-workshop\1 - bundling javascript\2 - end-result\webpack.config.babel.js] `import '@babel/polyfill'` was not found.
Hash: 56836b00f69d0ddbc284
Version: webpack 4.29.3
Time: 822ms
Built at: 02/12/2019 4:46:40 PM
    Asset      Size  Chunks             Chunk Names
bundle.js  82.4 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[115] ./src/main.js 384 bytes {0} [built]
[117] (webpack)/buildin/global.js 472 bytes {0} [built]
    + 281 hidden modules
```

__Note:__ You can safely ignore the error message regarding polyfills not being imported in webpack.config.babel.js (see [this](https://github.com/babel/babel-loader/issues/657#issuecomment-417962090)).

5. Open the **_dist_** folder and open __bundle.js__.
The code is transformed (and [minified](https://en.wikipedia.org/wiki/Minification_(programming)) to save space); you will see that the code is unrecognizable (and a lot bigger due to all compatibility code). You can use ctrl + shift + F (in VS Code) to format (and "unminify") the code, to better be able to read it.

As you can see Babel (and Webpack) enables us to write nice modern JavaScript, and then compile it for the browsers we need to support. 

[Go back]
