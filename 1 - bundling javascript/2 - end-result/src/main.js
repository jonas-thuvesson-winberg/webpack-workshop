import '@babel/polyfill';

const writeMessage = () => console.log('There be JavaScript!');
writeMessage();

let myArr = ['hejhopp', 'foo', 'hejbar'];
let filtered = myArr.filter(item => {
  if (item.startsWith('hej')) {
    return item;
  }
});
filtered.forEach(item => console.log(`${item} starts with "hej"`));
