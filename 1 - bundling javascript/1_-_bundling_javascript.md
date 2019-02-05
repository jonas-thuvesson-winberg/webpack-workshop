## Part 1 - Creating a build

1. Move to the folder __*1 - start-template*__.
2. Run "`npm install`". This uses the packages defined under `devDependencies` in __*package.json*__.
3. Open up the folder in *VS Code* using "`code .`" (note that you also can do "`code </path/to/folder>`").

### Adding JavaScript Bundling

In Webpack everything revolves around bundling JavaScript code into a package. We need an entrypoint for the code we want to bundle. In our case it is `index.js`.

We have two configuration files for Webpack in this project. One is `webpack.config.common.js` and one is `webpack.config.prod.js`. We

1. Open up 
