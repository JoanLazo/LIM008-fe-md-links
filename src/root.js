/**
  * 
  * @param {Evalua si la ruta es absoluta o relativa} root 
  */
const path = require('path');
const fs = require('fs');
const myMarked = require('marked');
const fetch = require('node-fetch');


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
// `${process.cwd(path)}/${paths.basename(path)}`; 
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
// console.log(isDirOrFile('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));

// console.log(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));
// path.extname() retorna una cadena

export const readFilesMd = (arrFiles) => { 
  let arrObjLinks = []; 
  arrFiles.forEach((file) => {
    const readMdFiles = fs.readFileSync(file, 'utf8');
    const renderer = new myMarked.Renderer();
    renderer.link = (href, title, text) => {
      arrObjLinks.push({ href, text, file: file});
    };
    myMarked(readMdFiles, {renderer});
  });
  return arrObjLinks;
};
console.log(readFilesMd(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba')));

// marked(markdownString [,options] [,callback])
// Create reference instance
// myMarked.setOptions({
//   renderer: new myMarked.Renderer(),
//   highlight: function(code) {
//   breaks: false,


// function checkStatus(res) {
//   if (res.ok) { // res.status >= 200 && res.status < 300
//       return res;
//   } else {
//       throw MyCustomError(res.statusText);
//   }
// }

// fetch('https://httpbin.org/status/400')
//   .then(checkStatus)
//   .then(res => console.log('will not get here...'))
export const validateAndStats = (arrObjLinks) => {
 

 const 
}
 