"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _root = require("./root.js");

var fs = require('fs'); // Devuelve true si existe la ruta, de lo contrario false.


var mdLinks = function mdLinks(route, options) {
  var promise = new Promise(function (resolve, reject) {
    if (fs.existsSync(route)) {
      var arrObjLinksAndTextAndFile = (0, _root.readFilesMd)((0, _root.isDirOrFile)((0, _root.convertInAbsolute)(route)));

      if (arrObjLinksAndTextAndFile.length > 0) {
        if (options.validate) {
          (0, _root.validateOption)(arrObjLinksAndTextAndFile).then(function (response) {
            return resolve(response);
          }).catch(function (err) {
            return reject(err);
          });
        } else {
          resolve(arrObjLinksAndTextAndFile);
        }
      } else {
        reject('No se encontraron links en los archivos .md');
      }
    } else {
      reject('La ruta colocada no existe, por favor intente con otra ruta');
    }
  });
  return promise;
}; // mdLinks('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba', {validate: true}).then(res => console.log(res));


exports.mdLinks = mdLinks;