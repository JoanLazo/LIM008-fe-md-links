"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateOption = exports.readFilesMd = exports.isDirOrFile = exports.convertInAbsolute = exports.pathAbsolute = void 0;

/**
  * 
  * @param {Evalua si la ruta es absoluta o relativa} root 
  */
var path = require('path');

var fs = require('fs');

var myMarked = require('marked');

var fetch = require('node-fetch'); // path.isAbsolute() retorna un boleano


var pathAbsolute = function pathAbsolute(root) {
  var isAbsolute = path.isAbsolute(root);
  return isAbsolute;
}; // path.resolve() retorna un string


exports.pathAbsolute = pathAbsolute;

var convertInAbsolute = function convertInAbsolute(root) {
  var pathResolve = path.resolve(root);
  return pathResolve;
}; // `${process.cwd(path)}/${paths.basename(path)}`; 
// dirent.isDirectory () retorna un bolean, dirent.isFile () retorna un boleano
// stats.isDirectory () Devuelve true si el fs.Statsobjeto describe un directorio de sistema de archivos, stats.isFile().
// fs.readdirSync(path[, options]) devuelve string o un directorio o buffer
// fs.readFileSync(path[, options])


exports.convertInAbsolute = convertInAbsolute;

var isDirOrFile = function isDirOrFile(root) {
  var fileArray = [];
  var readDirectory = fs.readdirSync(root);
  readDirectory.forEach(function (element) {
    var joinRoutes = path.join(root, element);

    if (fs.statSync(joinRoutes).isDirectory()) {
      fileArray = fileArray.concat(isDirOrFile(joinRoutes));
    } else if (fs.statSync(joinRoutes).isFile() && path.extname(joinRoutes) === '.md') {
      fileArray.push(joinRoutes);
    }
  });
  return fileArray;
}; // console.log(isDirOrFile('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));
// console.log(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));
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
}; // function checkStatus(res) {
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

var validateOption = function validateOption(arrObjLinks) {
  var linkFetch = arrObjLinks.map(function (links) {
    return fetch(links);
  });
  return Promise.all(linkFetch).then(function (response) {
    var arrLinksValidate = arrObjLinks.map(function (objLinks, linksValidate) {
      objLinks.status = response[linksValidate].status;
      objLinks.statusText = response[linksValidate].statusText;
      return objLinks;
    });
    return arrLinksValidate;
  });
}; // validateOption(readFilesMd(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'))).then(res => { 
//   console.log(res); 
// });
// console.log(validateOption([ { href:
//   'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//   'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md' },
// { href: 'https://claseslaboratoria.slack.com/messages',
//   text: 'slack',
//   file:
//   'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md' } ]));


exports.validateOption = validateOption;