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

5. Open up _main.js_ in the _**src**_ folder, and change the variable `name` to your name, and save the file.
6. Run `npm run build` again.
   Notice that we now have two bundle.js files in the _**dist**_ folder. This is a problem.

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

If you look in the _**dist**_ folder you'll see we only have the latest bundle file.

### Adding resources: CSS and images

1. Open up the file _webpack.config.js_ once more.
2. Add the following to the import section at the top:

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

This plugin will use a preprocessor to make our SCSS (SASS) file into a CSS file. We can then reference it in our JavaScript.

3. Add the following to the `plugins` array:

```
new MiniCssExtractPlugin({
    filename: 'styles.[hash].css'
})
```

This will use the name _"styles"_, append the file hash, and then add the extension _"css"_.'

4. We also need to add the following under the `rules` node:

```
 {
    test: /\.scss$/,
    include: [path.resolve(__dirname, 'src')],
    exclude: [path.resolve(__dirname, 'node_modules')],
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
},
{
    test: /\.(png|jpg|gif)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]',
                outputPath: 'img/',
                publicPath: 'img/'
            }
        }
    ]
}
```

First we have the handling of SCSS files. `use` is read from right to left, and the input from the previous loader is fed into the next. This tells Webpack that we want to use the `scss-loader` (turn into CSS), then the `css-loader` (make CSS available as a module) and lastly the `MiniCssExtractPlugin.loader` (extract CSS content).

We then have the image handling. This entry tells Webpack to make images available to our JavaScript by turning them into modules (using the `file-loader`). It also renames the files and adds a hash, to prevent caching (as previously discussed). We have also declared that the images should end up in a different relative output directory.

4. To be able to use the static resources however, we need to reference them in our **_entry point_**. Open up _main.js_ and add the following import statements:

```
import './styles.scss';
import catImg from './assets/images/cat.jpg';
```

5. It should also be noted that webpack uses something called _tree shaking_ in production mode, which will remove everything that is not referenced in CSS and JavaScript files (more about this in a later lesson). Because of this, we need to change one entry in _package.json_, to tell Webpack that we don't want the imports of CSS and SCSS to be removed during compilation (even though these files are not explicitly used inside the JavaScript entry file):

Turn

```
"sideEffects": "false"
```

into

```
"sideEffects": [
    "*.css",
    "*.scss"
]
```
You can read more about side effects, tree shaking and Webpack [here](https://webpack.js.org/guides/tree-shaking/).

5. Open up the terminal and run `npm run build`.

You should now have a `.css` file, and a folder _img_ with the cat image, in the _dist_ directory.¨

### Adding HTML

We want to use the CSS and images in HTML. We are going to use the HtmlWebpackPlugin. I have prepared a script (generateHtmlPluginSetup.js), to make the process a bit easier. Feel free to look into the file if you want to. What it does is basically create a new HtmlWebpackPlugin entry for every html filename we provide it with.

1. Add the following code to the _webpack.config.js_ import section:

```
const generateHtmlPluginSetup = require('./generateHtmlPluginSetup');
```

2. Add the following code to the _webpack.config.js_ file (between the imports and `module.export`):

```
const htmlFiles = ['index.html', 'other.html'];
const htmlPluginInstances = generateHtmlPluginSetup(htmlFiles);

const plugins = [
  new CleanWebpackPlugin(['dist']),
  new MiniCssExtractPlugin({
    filename: 'styles.[hash].css'
  })
].concat(htmlPluginInstances);
```

2. To make use of the newly created `plugins` array, also replace the following code

```
plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
        filename: '[name].css'
    })
]
```

with

```
plugins: plugins
```

3. The HtmlWebpackPlugin will inject the JavaScript and CSS into our HTML files at build time by default. It will not, however resolve any referenced images. Because of this we want to add the `html-loader` to the `rules` node:

```
{
    test: /\.html$/,
    use: ['html-loader']
}

```

4. Now run `npm run build`.

If you open up the _dist_ folder in the file system, you should now be able to open _index.html_ in a browser. The images work as links. The dog image is used in HTML and resolved by the `html-loader`, and the cat image is added dynamically through JavaScript, and resolved by the `file-loader`. (You can compare _index.html_ in _src_ and in _dist_)
