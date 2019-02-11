import '@babel/polyfill';

let name = 'World';
console.log(`Hello ${name}!`);

// Adds image "dynamically" during runtime to the HTML page
// catImg is resolved at compile time by the file-loader
const element = document.getElementById('placeholder');
if (element) {
  element.innerHTML = "<img src='" + catImg + "'/>";
}