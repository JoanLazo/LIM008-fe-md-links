#!/usr/bin/env node
"use strict";

var _index = require("./index.js");

// const [,, ...args] = process.argv;
// console.log(`Hello World ${args}`);
console.log(process.argv);
var myArgs = process.argv.slice(2);
var route = process.argv[0]; // option es un objeto buleano