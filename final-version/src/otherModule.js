export const printHello = name => {
  if (name) {
    console.log(`Hello ${name}!`);
  } else {
    console.log('Hello world');
  }
};

export const removeUnlessUsed = () => {
  console.log('I should be removed unless used');
}
