"use strict";

var _root = require("./root.js");

// const convertInAbsolute = require('./root.js');
// const isDirOrFile = require('./root.js');
// const readFilesMd = require('./root.js');
// const validateOption = require('./root.js');
// const uniqueLinks = require('./root.js');
// const brokenLinks = require('./root.js');
// const totalLinks = require('./root.js');
var options = {
  validate: false,
  stats: false
};

var mdLinks = function mdLinks(route, options) {
  var promise = new Promise(function (resolve, reject) {
    var arrObjLinksAndTextAndFile = (0, _root.readFilesMd)((0, _root.isDirOrFile)((0, _root.convertInAbsolute)(route)));

    if (arrObjLinksAndTextAndFile.length > 0) {
      if (options.validate) {
        (0, _root.validateOption)(arrObjLinksAndTextAndFile).then(function (response) {
          response.forEach(function (resLinks) {
            resolve("".concat(resLinks.file, ", ").concat(resLinks.href, ", ").concat(resLinks.statusText, ",").concat(resLinks.status, ", ").concat(resLinks.text));
          });
        });
      } else if (options.stats) {
        resolve("Total: ".concat((0, _root.totalLinks)(arrObjLinksAndTextAndFile), " \nUnique: ").concat((0, _root.uniqueLinks)(arrObjLinksAndTextAndFile)));
      } else if (options.validate && options.stats) {
        (0, _root.validateOption)(arrObjLinksAndTextAndFile).then(function (response) {
          return resolve("Total: ".concat((0, _root.totalLinks)(response), ", \nUnique: ").concat((0, _root.uniqueLinks)(response), ", \nBroken: ").concat((0, _root.brokenLinks)(response)));
        });
      } else {
        arrObjLinksAndTextAndFile.forEach(function (objLinks) {
          resolve("".concat(objLinks.file, ", ").concat(objLinks.href, ", ").concat(objLinks.text));
        });
      }
    } else {
      reject('No se encontraron links');
    }
  });
  return promise;
}; // mdLinks('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba', {valide: true});


module.exports = mdLinks;