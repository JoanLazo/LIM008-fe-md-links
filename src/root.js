/**
  * 
  * @param {Evalua si la ruta es absoluta o relativa} path 
  */
const path = require('path');

export const pathAbsolute = (root) => {
  const isAbsolute = path.isAbsolute(root); 
  let convertInAbsolute = '';
  if (isAbsolute === true) {
    convertInAbsolute += root;
  } else {
    convertInAbsolute += path.resolve(root);
  }
  return convertInAbsolute;
};

/**
 * 
 * @param {ruta que busca archivos} root 
 * @param {buscar a partir de la ubicacion actual de la ruta} search
 */
// dirent.isDirectory () retorna un bolean dirent.isFile () retorna un boleano


export const searchFiles = () => {
 
};

const fs = require('fs');
// path.extname() retorna una cadena

export const valideMdFiles = () => {  

};

// fs.readFileSync(path[, options])
