stash this here for now...

Webpack uses configuration files that are, in themself, JavaScript files.
We have two configuration files for Webpack in this project. One is `webpack.config.common.js`
and one is `webpack.config.prod.js`. The thought is that **common** should contain the base
configuration (used for everything "webpack"), which can then be extended. These are then merged into one configuration during deploy. We need to tell webpack the [entrypoint](https://webpack.js.org/concepts/#entry) and how the javascript should be packaged (using a [loader](https://webpack.js.org/concepts/#loaders)).
