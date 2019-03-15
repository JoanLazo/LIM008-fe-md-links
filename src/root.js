const path = require('path');
const fs = require('fs');
const myMarked = require('marked');
const fetch = require('node-fetch');

/**
  * 
  * @param {Evalua si la ruta es absoluta o relativa} root 
  */
// path.isAbsolute() retorna un boleano
export const pathAbsolute = (root) => {
  const isAbsolute = path.isAbsolute(root); 
  return isAbsolute;
};

// path.resolve() retorna un string
export const convertInAbsolute = (root) => {
  const boleanRoot = pathAbsolute(root);
  let rootAbsolute;
  if (boleanRoot === true) {
    rootAbsolute = root;
  } else {
    rootAbsolute = path.resolve(root);
  }
  return rootAbsolute;
};

/**
 * 
 * @param {ruta absoluta} root 
 */
export const isDirOrFile = (root) => {
  let fileArray = [];
  if (fs.statSync(root).isDirectory() === false && path.extname(root) === '.md') {
    fileArray.push(root);
  } else {
    const readDirectory = fs.readdirSync(root);
    readDirectory.forEach((element) => {
      const joinRoutes = path.join(root, element);
      if (fs.statSync(joinRoutes).isDirectory()) {
        fileArray = fileArray.concat(isDirOrFile(joinRoutes));
      } else if (fs.statSync(joinRoutes).isFile() && path.extname(joinRoutes) === '.md') {
        fileArray.push(joinRoutes);
      }
    });
  }
  return fileArray;
};

/**
 * 
 * @param {arr con las ruta de los archivos md} arrFiles 
 */
export const readFilesMd = (arrFiles) => { 
  let arrObjLinks = []; 
  arrFiles.forEach((file) => {
    const readMdFiles = fs.readFileSync(file, 'utf8');
    const renderer = new myMarked.Renderer();
    renderer.link = (href, title, text) => {
      arrObjLinks.push({ href, text: text.slice(0, 50), file: file});
    };
    myMarked(readMdFiles, {renderer});
  });
  return arrObjLinks;
}; 

/**
 * 
 * @param {arr de objetos con href, link y text} arrObjLinks 
 */
export const validateOption = (arrObjLinks) => { 
  const arrPromises = arrObjLinks.map(links => new Promise((resolve) => {
    fetch(links)
      .then(response => {
        if (response.status >= 200 && response.status < 400) {
          links.status = response.status;
          links.statusText = response.statusText;
          resolve(links);
        } else {
          links.status = response.status;
          links.statusText = 'FAIL';
          resolve(links);
        }
      }).catch(() => {
        links.status = 'Link no valido';
        links.statusText = 'FAIL';
        resolve(links);
      }); 
  }));
  return Promise.all(arrPromises);
};
// El objeto Set te permite almacenar valores únicos de cualquier tipo, incluso valores primitivos u objetos de referencia.
// const myArray = ['value1', 'value2', 'value3'];
// const mySet = new Set(myArray);
// console.log([...mySet]);

export const uniqueLinks = (arrObjLinks) => {
  const newSetLinks = [...new Set(arrObjLinks.map((links) => links.href))];
  return newSetLinks.length;
};

/**
 * 
 * @param {arr de obj con href,link,text,textStatus y status} arrObjLinksValidate 
 */  
export const brokenLinks = (arrObjLinksValidate) => { 
  const arrBrokenLinks = arrObjLinksValidate.filter(link => link.statusText === 'FAIL');
  return arrBrokenLinks.length;
};

export const totalLinks = (arrObjLinks) => {
  const totalLinks = arrObjLinks;
  return totalLinks.length;
};

