import { convertInAbsolute, isDirOrFile, readFilesMd, validateOption, uniqueLinks, brokenLinks, totalLinks } from './root.js';
// import { resolve } from 'path';
// import { rejects } from 'assert';

export const mdLinks = (route, options) => {
  const promise = new Promise((resolve, reject) => {
    const arrObjLinksAndTextAndFile = readFilesMd(isDirOrFile(convertInAbsolute(route)));
    if (arrObjLinksAndTextAndFile.length > 0) {
      if (options.validate) {
        validateOption(arrObjLinksAndTextAndFile)
          .then(response => {
            response.forEach((resLinks) => {
              resolve(console.log(`${resLinks.file}, ${resLinks.href}, ${resLinks.statusText},${resLinks.status}, ${resLinks.text}`));
            });
          });
      } else if (options.stats) {
        resolve(console.log(`Total: ${totalLinks(arrObjLinksAndTextAndFile)} \nUnique: ${uniqueLinks(arrObjLinksAndTextAndFile)}`));
      } else if (options.validate && options.stats) {
        validateOption(arrObjLinksAndTextAndFile)
          .then(response => resolve(console.log(`Total: ${totalLinks(response)}, \nUnique: ${uniqueLinks(response)}, \nBroken: ${brokenLinks(response)}`))); 
      } else {
        arrObjLinksAndTextAndFile.forEach((objLinks) => {
          resolve(console.log(`${objLinks.file}, ${objLinks.href}, ${objLinks.text}`));
        });
      }
    } else {
      reject('No se encontraron links');
    }
  });
  return promise;
};
mdLinks('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba', {validate: true});

