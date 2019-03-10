"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _root = require("./root.js");

// import { resolve } from 'path';
// import { rejects } from 'assert';
var mdLinks = function mdLinks(route, options) {
  var promise = new Promise(function (resolve, reject) {
    var arrObjLinksAndTextAndFile = (0, _root.readFilesMd)(route);

    if (arrObjLinksAndTextAndFile.length > 0) {
      if (options.validate && options.stats === false) {
        (0, _root.validateOption)(arrObjLinksAndTextAndFile).then(function (response) {
          response.forEach(function (resLinks) {
            resolve(console.log("".concat(resLinks.file, "\t ").concat(resLinks.href, "\t ").concat(resLinks.statusText, "\t ").concat(resLinks.status, " \t ").concat(resLinks.text)));
          });
        });
      } else if (options.validate === false && options.stats) {
        resolve(console.log("Total: ".concat((0, _root.totalLinks)(arrObjLinksAndTextAndFile), " \nUnique: ").concat((0, _root.uniqueLinks)(arrObjLinksAndTextAndFile))));
      } else if (options.validate && options.stats) {
        (0, _root.validateOption)(arrObjLinksAndTextAndFile).then(function (response) {
          return resolve(console.log("Total: ".concat((0, _root.totalLinks)(response), " \nUnique: ").concat((0, _root.uniqueLinks)(response), " \nBroken: ").concat((0, _root.brokenLinks)(response))));
        });
      } else {
        arrObjLinksAndTextAndFile.forEach(function (objLinks) {
          resolve(console.log("".concat(objLinks.file, "\t ").concat(objLinks.href, "\t ").concat(objLinks.text)));
        });
      }
    } else {
      reject('No se encontraron links');
    }
  });
  return promise;
};

exports.mdLinks = mdLinks;
mdLinks("C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba", 'options.validate').then(function (res) {
  return res;
}); // const mdLinks = require("md-links");
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