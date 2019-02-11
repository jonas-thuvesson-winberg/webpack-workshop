import '@babel/polyfill';
import './styles.scss';
import catImg from './assets/images/cat.jpg';

let element = document.getElementById('placeholder');
if (element) {
  element.innerHTML = "<img src='" + catImg + "'/>";
}
