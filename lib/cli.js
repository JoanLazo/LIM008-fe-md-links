#!/usr/bin/env node
// import { mdLinks } from './index.js';
"use strict";

var mdLinks = require('./index.js'); // const [,, ...args] = process.argv;
// console.log(`Hello World ${args}`);
// console.log(process.argv);
// const myArgs = process.argv.slice(2);


var path = process.argv[1];
var option = process.argv[2];
var moreOption = process.argv[3]; // option es un objeto buleano

var options = {
  validate: false,
  stats: false
};

if (!path) {
  console.log('Debes ingresar la ruta de un archivo o directorio');
} else {
  if (option === '--validate') {
    options.validate = true;
    mdLinks(path, options).then(function (response) {
      return console.log("".concat(response.file, ", ").concat(response.href, ", ").concat(response.statusText, ",").concat(response.status, ", ").concat(response.text));
    }).catch(function (err) {
      return console.log(err);
    });
  } else if (option === '--stats') {
    option.stats = true;
    mdLinks(path, options).then(function (response) {
      return console.log(response);
    }).catch(function (err) {
      return console.log(err);
    });
  } else if (option === '--validate' && moreOption === '--stats') {
    options.validate = true;
    option.stats = true;
    mdLinks(path, options).then(function (response) {
      return console.log(response);
    }).catch(function (err) {
      return console.log(err);
    });
  } else if (option === '--stats' && moreOption === '--validate') {
    options.validate = true;
    option.stats = true;
    mdLinks(path, options).then(function (response) {
      return console.log(response);
    }).catch(function (err) {
      return console.log(err);
    });
  } else {
    mdLinks(path, options).then(function (response) {
      return console.log(response);
    }).catch(function (err) {
      return console.log(err);
    });
  }
}