/**
  * 
  * @param {Evalua si la ruta es absoluta o relativa} path 
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

/**
 * 
 * @param {ruta o directorio} path 
 */
// dirent.isDirectory () retorna un bolean, dirent.isFile () retorna un boleano
// stats.isDirectory () Devuelve true si el fs.Statsobjeto describe un directorio de sistema de archivos, stats.isFile().
// fs.readdirSync(path[, options]) devuelve string o un directorio o buffer


export const isDirOrFile = (root, fileArray) => {
  fileArray = [];
  const readDirectory = fs.readdirSync(root);
  readDirectory.forEach((element) => {
    const joinRoutes = path.join(root, element);
    if (fs.statSync(joinRoutes).isDirectory() === true) {
      fileArray = isDirOrFile(joinRoutes);
    } else {
      fileArray.push(joinRoutes);
    }
  });
  return fileArray;
};

// path.extname() retorna una cadena

export const isMdFiles = (file) => {  
  const isMdOrNot = path.extname(file);
  
  return isMdOrNot;
};

// fs.readFileSync(path[, options])
