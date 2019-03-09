"use strict";

var _root = require("..root.js");

var options = {
  validate: --validate,
  stats: --stats
};

var mdLinks = function mdLinks(input) {
  var path = (0, _root.pathAbsolute)(input);
  var rootAbs;

  if (path === false) {
    rootAbs.push((0, _root.convertInAbsolute)(path));
  } else {
    rootAbs = input;
  }

  var allLinks = (0, _root.readFilesMd)((0, _root.isDirOrFile)(rootAbs));
}; // const mdLinks = require("md-links");
// mdLinks("./some/example.md")
//   .then(links => {
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