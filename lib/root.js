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
}; // console.log(convertInAbsolute('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\prueba'));
// `${process.cwd(path)}/${paths.basename(path)}`; 
// dirent.isDirectory () retorna un bolean, dirent.isFile () retorna un boleano
// stats.isDirectory () Devuelve true si el fs.Statsobjeto describe un directorio de sistema de archivos, stats.isFile().
// fs.readdirSync(path[, options]) devuelve string o un directorio o buffer
// fs.readFileSync(path[, options])


exports.convertInAbsolute = convertInAbsolute;

var isDirOrFile = function isDirOrFile(root) {
  var fileArray = [];

  if (fs.statSync(root).isDirectory() === false) {
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
}; // console.log(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));
// path.extname() retorna una cadena


exports.isDirOrFile = isDirOrFile;

var readFilesMd = function readFilesMd(arrFiles) {
  var arrObjLinks = [];
  arrFiles.forEach(function (file) {
    var readMdFiles = fs.readFileSync(file, 'utf8');
    var renderer = new myMarked.Renderer();

    renderer.link = function (href, title, text) {
      arrObjLinks.push({
        href: href,
        text: text,
        file: file
      });
    };

    myMarked(readMdFiles, {
      renderer: renderer
    });
  });
  return arrObjLinks;
}; // console.log(readFilesMd('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));
// function checkStatus(res) {
//   if (res.ok) { // res.status >= 200 && res.status < 300
//     return res;
//   } else {
//     throw MyCustomError(res.statusText);
//   }
// }
// fetch(arrObjLinks)
//   .then(checkStatus)
//   .then(res => console.log('fail'));
// fetch('https://github.com/')
//     .then(res => {
//         console.log(res.ok);
//         console.log(res.status);
//         console.log(res.statusText);
//         console.log(res.headers.raw());
//         console.log(res.headers.get('content-type'));
//     });   


exports.readFilesMd = readFilesMd;

var validateOption = function validateOption(arrFiles) {
  var newPromise = arrFiles.map(function (links) {
    return new Promise(function (resolve, reject) {
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
      }).catch(function (err) {
        return reject(err);
      });
    });
  });
  return Promise.all(newPromise);
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
}; // console.log(uniqueLinks([ { href:
//     'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//      'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
// status: 200,
// statusText: 'OK' },
// { href: 'https://claseslaboratoria.slack.com/messages',
//   text: 'slack',
//   file:
//      'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md',
//   status: 200,
//   statusText: 'OK' },
// { href:
//      'https://Carlosazaustre.es/manejando-la-asincronia-en-javascript.1/',
// text: 'asincronia',
// file:
//      'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\roto.md',
// status: 404,
// statusText: 'Not Found' } ]));


exports.uniqueLinks = uniqueLinks;

var brokenLinks = function brokenLinks(arrObjLinksValidate) {
  var arrBrokenLinks = arrObjLinksValidate.filter(function (link) {
    return link.statusText === 'FAIL';
  });
  return arrBrokenLinks.length;
}; // console.log(brokenLinks([{ href:
//   'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//   'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
// status: 200,
// statusText: 'OK' }, { href:
//   'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//   'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
// status: 200,
// statusText: 'OK' },
// { href: 'https://Claseslaboratori.slack.com/messages',
//   text: 'slack',
//   file:
//   'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md',
//   status: 404,
//   statusText: 'NOT FOUND' } ]));


exports.brokenLinks = brokenLinks;

var totalLinks = function totalLinks(arrObjLinks) {
  var totalLinks = arrObjLinks;
  return totalLinks.length;
}; // console.log(statsOption([{ href:
//     'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//     'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
// status: 200,
// statusText: 'OK' }, { href:
//     'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//     'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
// status: 200,
// statusText: 'OK' },
// { href: 'https://Claseslaboratori.slack.com/messages',
//   text: 'slack',
//   file:
//     'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md',
//   status: 404,
//   statusText: 'NOT FOUND' } ]));
// validateOption('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba').then(res => { 
//   console.log(res); 
// });
// validateOption('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba').then(res => { 
//   console.log(res); 
// });
// module.exports = convertInAbsolute;
// module.exports = isDirOrFile;
// module.exports = readFilesMd;
// module.exports = validateOption;
// module.exports = uniqueLinks;
// module.exports = brokenLinks;
// module.exports = totalLinks;


exports.totalLinks = totalLinks;