#!/usr/bin/env node
import { mdLinks } from './index.js';

// const [,, ...args] = process.argv;

// console.log(`Hello World ${args}`);

// console.log(process.argv);
const myArgs = process.argv.slice(2);
// const node = process.argv[0];
// const archivo = process.argv[1];
// option es un objeto buleano
const options = {
    validate: false,
    stats: false,
  };

if (myArgs.length === 0) {
  console.log('Coloca una ruta o archivo ejemplo: C:\\Users\\Laboratoria\\Documents\\ejemplo.md');
} else { 
  mdLinks(myArgs, options)
    then((arrObjLinks) => {
      ifen(links => {
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);

// mdLinks("./some/example.md", { validate: true })
//   .then(links => {
//     // => [{ href, text, file, status, ok }]
//   })
//   .catch(console.error);

// mdLinks("./some/dir")
//   .then(links => {
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);