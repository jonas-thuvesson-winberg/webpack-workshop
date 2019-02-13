# Optimizing the build

When you run Webpack in `mode: 'production'`, it will do a lot of optimizations out of the box, like [tree shaking](https://en.wikipedia.org/wiki/Tree_shaking) and [minification](https://en.wikipedia.org/wiki/Minification_(programming)) of JavaScript.

1. We have one Webpack configuration (that does not declare `mode`). If you open up _package.config_, you will see that we have two `scripts`; `build` and `build-dev`. The only difference is the `--mode` flag. This let's us control the output.

2. run `npm install` in the root directory (**_/4 - Optimizations/2 - end-result_**).
3. If you open _main.js_ and _other.js_ in **_src_**, you will see that _main.js_ imports the function `foo`, but not `bar`. 

Run `npm run build-dev` in the terminal.

4. Open the file _bundle.&lt;hash&gt;.js_ in the **_/dist_** folder.
5. Search for "I'm used". You should get a match. Then search for "I'm not used". You should get a match here as well.
6. Now close the file, and run `npm run build`.
7. Once again, open the file _bundle.&lt;hash&gt;.js_ in the **_/dist_** folder. This time you will see that it has been minified; there are no spaces in the script.
8. Search for "I'm used". You should get a match. Then search for "I'm not used". You should **NOT** get a match this time.

What has happened is that Webpack has checked which parts of your JavaScript that is not used, based on what is imported or not.
