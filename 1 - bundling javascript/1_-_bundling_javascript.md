[go back]: ../readme.md

[Go back]

## Part 1 - Creating a build

1. Move to the folder **_1 - start-template_**.
2. Run "`npm install`". This uses the packages defined under `devDependencies` in **_package.json_**. Note\*\*: All the required packages have been added in advance for this workshop for convinience's sake, by using `npm install --save-dev <package-name>`.
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
        "useBuiltIns": "usage",
        "modules": false,
        "debug": true
      }
    ]
  ]
}
```

The [preset-env](https://babeljs.io/docs/en/babel-preset-env) is a general (smart) preset, which allows for different outputs based on your needs.

Babel uses a combination of plugins (transforms JavaScript) and polyfills (injected code to allow for a missing browser feature).

`"useBuiltIns": "usage"` tells Babel to add plugins and polyfills based on the usage in each file. Read about [polyfills](<https://en.wikipedia.org/wiki/Polyfill_(programming)>) here, and about [useBuiltIns here](https://babeljs.io/docs/en/babel-preset-env#usebuiltins).

`"modules": false` tells Babel to not transform [ES2015 (or ES6) module format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to another module format. In this case we don't want this transformation, since we want Webpack to be able to perform tree shaking (more on this later). Webpack does this based on unused imports (`import <entity> from 'mymodule'`). It then handles the transformation of these modules itself. Hence we don't want (or need) Babel to do this task. If you would use Babel on it's own it would be a different story.

`"debug": true` tells Babel to output the exact plugins it ends up using in the compilation process of your code. This requires an extra step of Webpack though, as we will see soon.

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

We want to transform and bundle the files in our _src_ directory, but not the _node_modules_ directory. Of course, referenced code from _node_modules_ will be included in the final bundle.

4. We can now run our build by typing `npm run build-dev` in the terminal. This command is defined in the _package.json_ file, which in turn calls webpack with the development mode flag.

You should see something similar to this:

```
λ  npm run build-dev

> webpack-workshop@1.0.0 build-dev C:\Programming\JavaScript\webpack-workshop\1 - bundling javascript\1 - start-template
> webpack --mode development

Hash: 859897d56f37a9c9fd5b
Version: webpack 4.29.3
Time: 85ms
Built at: 02/08/2019 3:35:34 PM
  Asset      Size  Chunks             Chunk Names
main.js  4.13 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/index.js] 345 bytes {main} [built]
```

This is to easier debug code in development, and Notice that we don't get the debug information from Babel. For this to work we need to rename our webpack config file to _webpack.config.babel.js_. You also need to change the NPM build script in _package.json_ from ` "build": "webpack --config webpack.config.js"``to `"build": "webpack --config webpack.config.babel.js"`. After doing this, run`npm run build-dev` once again.
Now your output will be different:

```
λ  npm run build-dev

> webpack-workshop@1.0.0 build-dev C:\Programming\JavaScript\webpack-workshop\1 - bundling javascript\1 - start-template
> webpack --mode development

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

Using polyfills with `usage` option:
Hash: 3e32a9f4778f2785f221
Version: webpack 4.29.3
Time: 88ms
Built at: 02/08/2019 3:20:50 PM
      Asset      Size  Chunks             Chunk Names
    main.js  4.09 KiB    main  [emitted]  main
main.js.map  3.99 KiB    main  [emitted]  main
Entrypoint main = main.js main.js.map
[./src/index.js] 345 bytes {main} [built]
```

5. Open the **_dist_** folder and open __index.html__ in Google Chrome.
6. Open the dev tool with F12, and go to the console. You should see some print outs:
```
There be JavaScript!                  index.js:11 1
index.js:6 true starts with "hej"     index.js:11 2
index.js:6 false starts with "hej"    index.js:11 2
index.js:6 true starts with "hej"     index.js:11 3
```

Click on one of the references to index.js (e.g. index.js:11 1). You should see the code like this:
```
const writeMessage = () => console.log('There be JavaScript!');
writeMessage();

let myArr = ['hejhopp', 'foo', 'hejbar'];
let filtered = myArr.map(item => item.startsWith('hej'));
filtered.forEach(item => console.log(`${item} starts with "hej"`));
```
Notice that the JavaScript is not transformed. 

7. Go back to the terminal and run the command `npm run build` instead. This is also defined in __package.json__, and uses the mode production instead.

8. Go back to chrome and refresh the page (or repeat step 5 if you closed the window). Once again click on one of the references from the console logs. This time the code is transformed (and minified to save space). This makes it a bit hard to read, but if you would copy the code and format it in an editor you would get:
```
!(function(e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function(e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          r.d(
            n,
            o,
            function(t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return r.d(t, 'a', t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ''),
    r((r.s = 0));
})([
  function(e, t) {
    (() => console.log('There be JavaScript!'))();
    ['hejhopp', 'foo', 'hejbar']
      .map(e => e.startsWith('hej'))
      .forEach(e => console.log(`${e} starts with "hej"`));
  }
]);
```

As you can see Babel (and Webpack) enables us to write nice modern JavaScript, and then compile it for the browsers we need to support.

[Go back]
