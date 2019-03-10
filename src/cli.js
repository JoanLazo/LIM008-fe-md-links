#!/usr/bin/env node
import { mdLinks } from './index.js';

// const [,, ...args] = process.argv;

// console.log(`Hello World ${args}`);

console.log(process.argv);
const myArgs = process.argv.slice(2);
const route = process.argv[0];
// option es un objeto buleano
const options = {
  validate: false,
  stats: false,
};
