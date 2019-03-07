"use strict";

var mdLinks = require("md-links");

mdLinks("./some/example.md").then(function (links) {// => [{ href, text, file }]
}).catch(console.error);
mdLinks("./some/example.md", {
  validate: true
}).then(function (links) {// => [{ href, text, file, status, ok }]
}).catch(console.error);
mdLinks("./some/dir").then(function (links) {// => [{ href, text, file }]
}).catch(console.error);