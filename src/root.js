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

export const validateOption = (arrObjLinks) => { 
  const arrLinks = arrObjLinks.map((links) => links.href);
  const linkFetch = arrLinks.map(links => fetch(links));
  console.log(linkFetch)
};
console.log(validateOption(readFilesMd(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'))));