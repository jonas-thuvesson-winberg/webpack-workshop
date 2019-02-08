import '@babel/polyfill';
// import style from './styles.css';
require('./styles.scss');
// require('./index.html');
// require('./other.html');
import trollImg from './assets/images/image.jpg';

console.log('ffs');

let element = document.getElementById('placeholder');
element.innerHTML = "<img src='"+ trollImg +"'/>";
