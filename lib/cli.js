#!/usr/bin/env node
"use strict";

var _index = require("./index.js");

var _root = require("./root.js");

// const [,, ...args] = process.argv;
// console.log(`Hello World ${args}`);
// console.log(process.argv);
var path = process.argv[2];
var option = process.argv[3];
var moreOption = process.argv[4]; // option es un objeto buleano

var options = {
  validate: false
};

if (!path) {
  console.log('Debes ingresar la ruta de un archivo o directorio');
} else if (option === '--validate' && moreOption === '--stats') {
  options.validate = true;
  (0, _index.mdLinks)(path, options).then(function (response) {
    return console.log("Total: ".concat((0, _root.totalLinks)(response), " \nUnique: ").concat((0, _root.uniqueLinks)(response), " \nBroken: ").concat((0, _root.brokenLinks)(response)));
  }).catch(function (err) {
    return console.log(err);
  });
} else if (option === '--stats' && moreOption === '--validate') {
  options.validate = true;
  (0, _index.mdLinks)(path, options).then(function (response) {
    return console.log("Total: ".concat((0, _root.totalLinks)(response), " \nUnique: ").concat((0, _root.uniqueLinks)(response), " \nBroken: ").concat((0, _root.brokenLinks)(response)));
  }).catch(function (err) {
    return console.log(err);
  });
} else if (option === '--validate') {
  options.validate = true;
  (0, _index.mdLinks)(path, options).then(function (response) {
    return response.forEach(function (objLinks) {
      return console.log("".concat(objLinks.file, ", ").concat(objLinks.href, ", ").concat(objLinks.statusText, ", ").concat(objLinks.status, ", ").concat(objLinks.text));
    });
  }).catch(function (err) {
    return console.log(err);
  });
} else if (option === '--stats') {
  (0, _index.mdLinks)(path, options).then(function (response) {
    return console.log("Total: ".concat((0, _root.totalLinks)(response), " \nUnique: ").concat((0, _root.uniqueLinks)(response)));
  }).catch(function (err) {
    return console.log(err);
  });
} else {
  (0, _index.mdLinks)(path, options).then(function (response) {
    return response.forEach(function (objLinks) {
      return console.log("".concat(objLinks.file, ", ").concat(objLinks.href, ", ").concat(objLinks.text));
    });
  }).catch(function (err) {
    return console.log(err);
  });
}