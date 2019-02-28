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
 * @param {--save o --stats} options 
 */
// dirent.isDirectory () retorna un bolean, dirent.isFile () retorna un boleano
// stats.isDirectory () Devuelve true si el fs.Statsobjeto describe un directorio de sistema de archivos.
// fs.readdirSync(path[, options]) devuelve string o un directorio o buffer

// let mdFiles = [];
export const isDirOrFile = (path) => {
  const readDirectory = fs.readdirSync(path);
  return readDirectory;
};

export const readDirectory = (path, options) => {
  const statsIsDirectory = fs.Stats(path).isDirectory;
};
// path.extname() retorna una cadena

export const valideMdFiles = () => {  

};

// fs.readFileSync(path[, options])
