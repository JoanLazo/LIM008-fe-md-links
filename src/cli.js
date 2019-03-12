#!/usr/bin/env node

// import { mdLinks } from './index.js';
const mdLinks = require('./index.js');
// const [,, ...args] = process.argv;

// console.log(`Hello World ${args}`);

// console.log(process.argv);
// const myArgs = process.argv.slice(2);
const path = process.argv[1];
const option = process.argv[2];
const moreOption = process.argv[3];
// option es un objeto buleano
const options = {
  validate: false,
  stats: false,
};

if (!path) {
  console.log('Debes ingresar la ruta de un archivo o directorio');
} else { 
  if (option === '--validate') {
    options.validate = true;
    mdLinks(path, options)
      .then(response => console.log(`${response.file}, ${response.href}, ${response.statusText},${response.status}, ${response.text}`))
      .catch(err => console.log(err));
  } else if (option === '--stats') {
    option.stats = true;
    mdLinks(path, options)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  } else if (option === '--validate' && moreOption === '--stats') {
    options.validate = true;
    option.stats = true;
    mdLinks(path, options)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  } else if (option === '--stats' && moreOption === '--validate') {
    options.validate = true;
    option.stats = true;
    mdLinks(path, options)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  } else {
    mdLinks(path, options)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }
}