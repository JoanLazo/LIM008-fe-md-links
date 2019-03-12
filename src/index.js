import { convertInAbsolute, isDirOrFile, readFilesMd, validateOption, uniqueLinks, brokenLinks, totalLinks } from './root.js';

// const convertInAbsolute = require('./root.js');
// const isDirOrFile = require('./root.js');
// const readFilesMd = require('./root.js');
// const validateOption = require('./root.js');
// const uniqueLinks = require('./root.js');
// const brokenLinks = require('./root.js');
// const totalLinks = require('./root.js');

const options = {
  validate: false,
  stats: false,
};

const mdLinks = (route, options) => {
  const promise = new Promise((resolve, reject) => {
    const arrObjLinksAndTextAndFile = readFilesMd(isDirOrFile(convertInAbsolute(route)));
    if (arrObjLinksAndTextAndFile.length > 0) {
      if (options.validate) {
        validateOption(arrObjLinksAndTextAndFile)
          .then(response => {
            response.forEach((resLinks) => {
              resolve(`${resLinks.file}, ${resLinks.href}, ${resLinks.statusText},${resLinks.status}, ${resLinks.text}`);
            });
          });
      } else if (options.stats) {
        resolve(`Total: ${totalLinks(arrObjLinksAndTextAndFile)} \nUnique: ${uniqueLinks(arrObjLinksAndTextAndFile)}`);
      } else if (options.validate && options.stats) {
        validateOption(arrObjLinksAndTextAndFile)
          .then(response => resolve(`Total: ${totalLinks(response)}, \nUnique: ${uniqueLinks(response)}, \nBroken: ${brokenLinks(response)}`)); 
      } else {
        arrObjLinksAndTextAndFile.forEach((objLinks) => {
          resolve(`${objLinks.file}, ${objLinks.href}, ${objLinks.text}`);
        });
      }
    } else {
      reject('No se encontraron links');
    }
  });
  return promise;
};
// mdLinks('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba', {valide: true});

module.exports = mdLinks;