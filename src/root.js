/**
  * 
  * @param {Evalua si la ruta es absoluta o relativa} root 
  */
const path = require('path');
const fs = require('fs');

// path.isAbsolute() retorna un boleano
export const pathAbsolute = (root) => {
  const isAbsolute = path.isAbsolute(root); 
  return isAbsolute;
};

// path.resolve() retorna un string
export const convertInAbsolute = (root) => {
  const pathResolve = path.resolve(root);
  return pathResolve;
};

// dirent.isDirectory () retorna un bolean, dirent.isFile () retorna un boleano
// stats.isDirectory () Devuelve true si el fs.Statsobjeto describe un directorio de sistema de archivos, stats.isFile().
// fs.readdirSync(path[, options]) devuelve string o un directorio o buffer
// fs.readFileSync(path[, options])

export const isDirOrFile = (root) => {
  let fileArray = [];
  const readDirectory = fs.readdirSync(root);
  readDirectory.forEach((element) => {
    const joinRoutes = path.join(root, element);
    if (fs.statSync(joinRoutes).isDirectory()) {
      fileArray = fileArray.concat(isDirOrFile(joinRoutes));
    } else if (fs.statSync(joinRoutes).isFile() && path.extname(joinRoutes) === '.md') {
      fileArray.push(joinRoutes);
    } else {
      console.log('No se encontraron archivos');
    }
  });
  return fileArray;
};

// console.log(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));
// path.extname() retorna una cadena

export const readFiles = (root, options) => {  
  const readMdFiles = fs.readFileSync(root, options);
  return readMdFiles;
};
console.log(readFiles('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md'));

// marked(markdownString [,options] [,callback])
// Create reference instance
const myMarked = require('marked');
const jsdom = require(' jsdom ');
const { JSDOM } = jsdom;

myMarked.setOptions({
  renderer: new myMarked.Renderer(),
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});
// Compile
console.log(myMarked('I am using __markdown__.'));

export const convertInHtml = (root) => {
  const markedJs = myMarked(root);
  return markedJs;
};