[go back]: ../readme.md

[Go back]

## Part 2 - Adding HTML and styling

In the previous lesson we used a loader (babel-loader) to process files. Loaders help Webpack transform files other than JavaScript (such as images and CSS files) into valid JavaScript modules. This is what allows us to for example import an image or css file straight into a JavScript file, like this:

```
import styles from './styles.css';
import myImg from './assets/image.png';
```

Webpack also support plugins, which can help do more complex tasks during the build process. In this lesson we will make use of the CleanWebpackPlugin, MiniCssExtractPlugin and the HtmlWebpackPlugin, as well as the file-loader. We are doing this to be able to reset the distribution folder, transpile SCSS files to CSS files, and then add references for generated content (JavaScript, CSS and images) into our HTML code.

### Cache busting

A browser has a tendency to cache static resources (JavaScript, CSS and images), when it sees that the client has the resource stored already. Sometimes you want to prevent this; the file has changed. A way to do this is by using "cache busting" techniques. One such technique is adding hashes to filenames. Since the hash will change if the file has changed, we help the browser to recognize it as a new (updated) file.

1. Let's ope up our _webpack.config.js_, and do the following:
   Change

```
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
}
```

to

```
output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
}
```

Webpack has several built in functions to reference different aspects of a filename being processed. These include file hash (`[hash]`), file name (`[name]`) and file extension (`[ext]`), among others, and help us construct more complex file names.

2. Open the terminal (and move to the root: _**2 - adding html and styling/1 - start-template**_).
3. run `npm install`.
4. run `npm run build`.
   If you look in the _**dist**_ folder you'll see a file with a hash in the file name.

5. Open up _main.js_ and change the variable `name` to your name, and save the file.
6. Run `npm run build` again.
   Notice that we now have two bundle.js files. This is a problem.

### Cleaning up after ourselves

We need to delete the dist folder before doing a deployment.

1. Open up the file _webpack.config.js_ once more.
2. Add the following code to the top of the file:

```
const CleanWebpackPlugin = require('clean-webpack-plugin');
```

The CleanWebpackPlugin removes a folder or certain file as a post deploy step. That's it.

3. We also need to add the following to the `plugins` array:

```
new CleanWebpackPlugin(['dist'])
```
4. save the file.
5. Now open the terminal and run `npm run build` once again. You will see the removal of the folder as a deploy step in the terminal output:
```
clean-webpack-plugin: C:\Programming\JavaScript\webpack-workshop\2 - adding html and styling\1 - start-template\dist has been removed.
```

### Adding resources: CSS and images
1. Open up the file _webpack.config.js_ once more.
2. Add the following to the import part at the top:
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```
This plugin will use a preprocessor to make our SCSS (SASS) file into a CSS file. We can then reference it in our JavaScript.

3. We also need to add the following under the `rules` node:
```
 {
    test: /\.scss$/,
    include: [path.resolve(__dirname, 'src')],
    exclude: [path.resolve(__dirname, 'node_modules')],
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
}
```
3. Add the following to the `plugins` array:
```
new MiniCssExtractPlugin({
    filename: '[name].css'
})
```
This will take the original filename (_"styles"_), append the file hash, and then add the output file extension (_"css"_).
4. Open up _main.js_ and add the following import statement:
```
import './styles.scss';
```

-------

Webpack uses configuration files that are, in themself, JavaScript files.
We have two configuration files for Webpack in this project. One is `webpack.config.common.js`
and one is `webpack.config.prod.js`. The thought is that **common** should contain the base
configuration (used for everything "webpack"), which can then be extended. These are then merged into one configuration during deploy. We need to tell webpack the [entrypoint](https://webpack.js.org/concepts/#entry) and how the javascript should be packaged (using a [loader](https://webpack.js.org/concepts/#loaders)).
