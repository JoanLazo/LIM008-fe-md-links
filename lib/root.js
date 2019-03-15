"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalLinks = exports.brokenLinks = exports.uniqueLinks = exports.validateOption = exports.readFilesMd = exports.isDirOrFile = exports.convertInAbsolute = exports.pathAbsolute = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = require('path');

var fs = require('fs');

var myMarked = require('marked');

var fetch = require('node-fetch');
/**
  * 
  * @param {Evalua si la ruta es absoluta o relativa} root 
  */
// path.isAbsolute() retorna un boleano


var pathAbsolute = function pathAbsolute(root) {
  var isAbsolute = path.isAbsolute(root);
  return isAbsolute;
}; // path.resolve() retorna un string


exports.pathAbsolute = pathAbsolute;

var convertInAbsolute = function convertInAbsolute(root) {
  var boleanRoot = pathAbsolute(root);
  var rootAbsolute;

  if (boleanRoot === true) {
    rootAbsolute = root;
  } else {
    rootAbsolute = path.resolve(root);
  }

  return rootAbsolute;
};
/**
 * 
 * @param {ruta absoluta} root 
 */


exports.convertInAbsolute = convertInAbsolute;

var isDirOrFile = function isDirOrFile(root) {
  var fileArray = [];

  if (fs.statSync(root).isDirectory() === false && path.extname(root) === '.md') {
    fileArray.push(root);
  } else {
    var readDirectory = fs.readdirSync(root);
    readDirectory.forEach(function (element) {
      var joinRoutes = path.join(root, element);

      if (fs.statSync(joinRoutes).isDirectory()) {
        fileArray = fileArray.concat(isDirOrFile(joinRoutes));
      } else if (fs.statSync(joinRoutes).isFile() && path.extname(joinRoutes) === '.md') {
        fileArray.push(joinRoutes);
      }
    });
  }

  return fileArray;
};
/**
 * 
 * @param {arr con las ruta de los archivos md} arrFiles 
 */


exports.isDirOrFile = isDirOrFile;

var readFilesMd = function readFilesMd(arrFiles) {
  var arrObjLinks = [];
  arrFiles.forEach(function (file) {
    var readMdFiles = fs.readFileSync(file, 'utf8');
    var renderer = new myMarked.Renderer();

    renderer.link = function (href, title, text) {
      arrObjLinks.push({
        href: href,
        text: text.slice(0, 50),
        file: file
      });
    };

    myMarked(readMdFiles, {
      renderer: renderer
    });
  });
  return arrObjLinks;
};
/**
 * 
 * @param {arr de objetos con href, link y text} arrObjLinks 
 */


exports.readFilesMd = readFilesMd;

var validateOption = function validateOption(arrObjLinks) {
  var arrPromises = arrObjLinks.map(function (links) {
    return new Promise(function (resolve) {
      fetch(links).then(function (response) {
        if (response.status >= 200 && response.status < 400) {
          links.status = response.status;
          links.statusText = response.statusText;
          resolve(links);
        } else {
          links.status = response.status;
          links.statusText = 'FAIL';
          resolve(links);
        }
      }).catch(function () {
        links.status = 'Link no valido';
        links.statusText = 'FAIL';
        resolve(links);
      });
    });
  });
  return Promise.all(arrPromises);
}; // El objeto Set te permite almacenar valores únicos de cualquier tipo, incluso valores primitivos u objetos de referencia.
// const myArray = ['value1', 'value2', 'value3'];
// const mySet = new Set(myArray);
// console.log([...mySet]);


exports.validateOption = validateOption;

var uniqueLinks = function uniqueLinks(arrObjLinks) {
  var newSetLinks = _toConsumableArray(new Set(arrObjLinks.map(function (links) {
    return links.href;
  })));

  return newSetLinks.length;
};
/**
 * 
 * @param {arr de obj con href,link,text,textStatus y status} arrObjLinksValidate 
 */


exports.uniqueLinks = uniqueLinks;

var brokenLinks = function brokenLinks(arrObjLinksValidate) {
  var arrBrokenLinks = arrObjLinksValidate.filter(function (link) {
    return link.statusText === 'FAIL';
  });
  return arrBrokenLinks.length;
};

exports.brokenLinks = brokenLinks;

var totalLinks = function totalLinks(arrObjLinks) {
  var totalLinks = arrObjLinks;
  return totalLinks.length;
};

exports.totalLinks = totalLinks;