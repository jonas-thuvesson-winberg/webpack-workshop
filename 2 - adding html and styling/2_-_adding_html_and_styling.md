[go back]: ../readme.md

[Go back]

## Part 2 - Adding HTML and styling
In this scenario we have static HTML that we want to bundle with the code. In the previous lesson we used a loader (babel-loader) to process files. Loaders generally do some pre-processing of files, and sometimes make them available through the code. We will use . They only expose one single function and can't affect the build process. Plugins hook into the build process and can do more complex thingsThere are various plugins and loaders to copy static content.




stash this here for now...

Webpack uses configuration files that are, in themself, JavaScript files.
We have two configuration files for Webpack in this project. One is `webpack.config.common.js`
and one is `webpack.config.prod.js`. The thought is that **common** should contain the base
configuration (used for everything "webpack"), which can then be extended. These are then merged into one configuration during deploy. We need to tell webpack the [entrypoint](https://webpack.js.org/concepts/#entry) and how the javascript should be packaged (using a [loader](https://webpack.js.org/concepts/#loaders)).
