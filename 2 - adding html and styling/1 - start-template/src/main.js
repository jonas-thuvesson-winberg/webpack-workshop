import '@babel/polyfill';
import './styles.scss';
import catImg from './assets/images/cat.jpg';

let name = 'World';
console.log(`Hello ${name}!`);

// Adds image "dynamically" during runtime to the HTML page
// catImg is resolved at compile time by the file-loader
let element = document.getElementById('placeholder');
if (element) {
  element.innerHTML = "<img src='" + catImg + "'/>";
}