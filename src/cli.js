#!/usr/bin/env node
import { mdLinks } from './index.js';

const [,, ...args] = process.argv;

console.log(`Hello World ${args}`);

// option es un objeto buleano
// const options = {
//   validate: false,
//   stats: false,
// };