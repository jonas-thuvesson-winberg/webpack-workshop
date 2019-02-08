import '@babel/polyfill';
require('./styles.scss');
import trollImg from './assets/images/image.jpg';

let element = document.getElementById('placeholder');
if (element) {
  element.innerHTML = "<img src='" + trollImg + "'/>";
}
