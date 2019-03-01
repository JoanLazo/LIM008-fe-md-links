"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFiles = exports.isDirOrFile = exports.convertInAbsolute = exports.pathAbsolute = void 0;

/**
  * 
  * @param {Evalua si la ruta es absoluta o relativa} root 
  */
var path = require('path');

var fs = require('fs'); // path.isAbsolute() retorna un boleano


var pathAbsolute = function pathAbsolute(root) {
  var isAbsolute = path.isAbsolute(root);
  return isAbsolute;
}; // path.resolve() retorna un string


exports.pathAbsolute = pathAbsolute;

var convertInAbsolute = function convertInAbsolute(root) {
  var pathResolve = path.resolve(root);
  return pathResolve;
}; // dirent.isDirectory () retorna un bolean, dirent.isFile () retorna un boleano
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
}; // console.log(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));
// path.extname() retorna una cadena


exports.isDirOrFile = isDirOrFile;

var readFiles = function readFiles(root, options) {
  var readMdFiles = fs.readFileSync(root, options);
  return readMdFiles;
};

exports.readFiles = readFiles;
console.log(readFiles("C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md"));