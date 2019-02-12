import '@babel/polyfill';
import './styles.scss';
import catImg from './assets/images/cat.jpg';
import { foo } from './other';

const msg = foo();
console.log(msg);

let name = 'Jonas';
console.log(`Hello ${name}!`);

const element = document.getElementById('placeholder');
if (element) {
  element.innerHTML = "<img src='" + catImg + "'/>";
}

throw Error('error');
