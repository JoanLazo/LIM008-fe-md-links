"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFilesMd = exports.isDirOrFile = exports.convertInAbsolute = exports.pathAbsolute = void 0;

/**
  * 
  * @param {Evalua si la ruta es absoluta o relativa} root 
  */
var path = require('path');

var fs = require('fs');

var myMarked = require('marked'); // const jsdom = require(' jsdom ');
// const { JSDOM } = jsdom;
// path.isAbsolute() retorna un boleano


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
    } else {
      console.log('No se encontraron archivos');
    }
  });
  return fileArray;
}; // console.log(isDirOrFile('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));
// console.log(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));
// path.extname() retorna una cadena


exports.isDirOrFile = isDirOrFile;

var readFilesMd = function readFilesMd(arrFiles) {
  var arrLinks = [];
  arrFiles.forEach(function (file) {
    var readMdFiles = fs.readFileSync(file, 'utf8');
    var renderer = new myMarked.Renderer();

    renderer.link = function (href, title, text) {
      arrLinks.push({
        href: href,
        text: text,
        file: file
      });
    };

    myMarked(readMdFiles, {
      renderer: renderer
    });
  });
  return arrLinks;
};

exports.readFilesMd = readFilesMd;
console.log(readFilesMd(isDirOrFile("C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba"))); // marked(markdownString [,options] [,callback])
// Create reference instance
// myMarked.setOptions({
//   renderer: new myMarked.Renderer(),
//   highlight: function(code) {
//     return require('highlight.js').highlightAuto(code).value;
//   },
//   pedantic: false,
//   gfm: true,
//   tables: true,
//   breaks: false,
//   sanitize: false,
//   smartLists: true,
//   smartypants: false,
//   xhtml: false
// });
// Compile
// console.log(myMarked('I am using __markdown__.'));