import '@babel/polyfill';
import NotUsed, { removeUnlessUsed } from './otherModule';
import style from './styles.scss';
import { printHello } from './otherModule';

console.log('There be JavaScript!');
// removeUnlessUsed();
printHello('Jonas');