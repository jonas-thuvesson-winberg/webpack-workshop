[go back]: ../readme.md

[Go back]

# 3 - Dev and prod

We now have a basic build pipeline. But wouldn't it be nice if we had a development environment, where we can see changes to our code instananously wihout the need to recompile everything all the time? Yes, yes it would. And we can set that up with `webpack-dev-server`.

## Adding a new configuration

If you open the root folder (**_3 - dev and prod/1 - start-template_**), you will see that we now have two webpack config files. There are several ways of having parallell configurations. One is to set the NODE_ENV and query that in the webpack config. I think that can get a bit messy, so I prefer to use the seconde approach, which instead separates configs into a common config, and then a dev and prod config that inherit the common one. This way you don't have to repeat config settings; everything that both dev and prod will use should be in the common config.

If you look in the common config you will see that it is set to development. This can be overriden in the inheriting configs. The separation of concerns in this scenario looks like this: The common config takes care of JavaScript, HTML, CSS and image handling/bundling, while the prod config takes care of clearing the dist folder. In development the files will be stored in memory instead of in disk, so we don't need to clear the dist directory.

We will now create a new config file that inherits common.

1. Create a new file **webpack.config.dev.js**. This will be our development config.
2. Add the following code:

```
const merge = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 9000
  }
});
```

`mode: development`

`devtool: 'source-map'`, will help us with debugging, since it will relate (map) where an error occured in your bundled JavaScript code, based on your "uncompiled" JavaScript code (that is more "human readable"), or tracing where a log message was issued etc. You can read more about te [devtool here](https://webpack.js.org/configuration/devtool/#devtool).

`devServer` is a tool for running the live reloading develoment server. Live reloading means that the page will refresh each time a file changes in our project. You can also enable Hot Module Reloading/Replacement (HMR), which will allow JavaScript code (modules) to be replaced, without the whole page refreshing. This keeps your state in the current browser session. HMR is harder to set up and is not within scope of this course. You can read more about the [dev server, HMR and much more here](https://webpack.js.org/configuration/dev-server/).

3. Open the file _package.json_ and add the following code under the `scripts` node:

```
"start": "webpack-dev-server --open --config webpack.config.dev.js"
```

Notice that `build` is already defined, and that we choose entrypoint in both scripts with the `--config` flag.

`--open` opens the dev server in the browser.

4. Now run `npm install` in the root folder.
5. Then run `npm start`. This will start the dev server, and open it in your default browser.

Try to change files in the **_src_** folder and see the page refresh.

**magic**

[go back]: ../readme.md

[Go back]
