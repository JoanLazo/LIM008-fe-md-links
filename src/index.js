import { readFilesMd, validateOption, uniqueLinks, brokenLinks, totalLinks } from './root.js';
// import { resolve } from 'path';
// import { rejects } from 'assert';

export const mdLinks = (route, options) => {
  const promise = new Promise((resolve, reject) => {
    const arrObjLinksAndTextAndFile = readFilesMd(route);
    if (arrObjLinksAndTextAndFile.length > 0) {
      if (options.validate && options.stats === false) {
        validateOption(arrObjLinksAndTextAndFile)
          .then(response => {
            response.forEach((resLinks) => {
              resolve(console.log(`${resLinks.file}, ${resLinks.href}, ${resLinks.statusText},${resLinks.status}, ${resLinks.text}`));
            });
          });
      } else if (options.validate === false && options.stats) {
        resolve({ total: totalLinks(arrObjLinksAndTextAndFile), unique: uniqueLinks(arrObjLinksAndTextAndFile)});
      } else if (options.validate && options.stats) {
        validateOption(arrObjLinksAndTextAndFile)
          .then(response => resolve({total: totalLinks(response), unique: uniqueLinks(response), broken: brokenLinks(response)})); 
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
// mdLinks('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba', 'options.validate').then(res => res);

// const mdLinks = require("md-links");

// mdLinks("./some/example.md")
//   .then(links => {
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);

// mdLinks("./some/example.md", { validate: true })
//   .then(links => {
//     // => [{ href, text, file, status, ok }]
//   })
//   .catch(console.error);

// mdLinks("./some/dir")
//   .then(links => {
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);