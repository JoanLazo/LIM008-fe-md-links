#!/usr/bin/env node

import { mdLinks } from './index.js';
import { uniqueLinks, brokenLinks, totalLinks } from './root.js';

// const [,, ...args] = process.argv;
// console.log(`Hello World ${args}`);

// console.log(process.argv);
const path = process.argv[2];
const option = process.argv[3];
const moreOption = process.argv[4];
// option es un objeto buleano
const options = {
  validate: false
};

if (!path) {
  console.log('Debes ingresar la ruta de un archivo o directorio');
} else if (option === '--validate' && moreOption === '--stats') {
  options.validate = true;
  mdLinks(path, options)
    .then(response => console.log(`Total: ${totalLinks(response)} \nUnique: ${uniqueLinks(response)} \nBroken: ${brokenLinks(response)}`))
    .catch(err => console.log(err));
} else if (option === '--stats' && moreOption === '--validate') {
  options.validate = true;
  mdLinks(path, options)
    .then(response => console.log(`Total: ${totalLinks(response)} \nUnique: ${uniqueLinks(response)} \nBroken: ${brokenLinks(response)}`))
    .catch(err => console.log(err));
} else if (option === '--validate') {
  options.validate = true;
  mdLinks(path, options)
    .then(response => response.forEach((objLinks) => console.log(`${objLinks.file}, ${objLinks.href}, ${objLinks.statusText}, ${objLinks.status}, ${objLinks.text}`)))
    .catch(err => console.log(err));
} else if (option === '--stats') {
  mdLinks(path, options)
    .then(response => console.log(`Total: ${totalLinks(response)} \nUnique: ${uniqueLinks(response)}`))
    .catch(err => console.log(err));
} else { 
  mdLinks(path, options)
    .then(response => response.forEach((objLinks) => 
      console.log(`${objLinks.file}, ${objLinks.href}, ${objLinks.text}`)))
    .catch(err => console.log(err));
}