import { convertInAbsolute, isDirOrFile, readFilesMd, validateOption } from './root.js';
const fs = require('fs');
// Devuelve true si existe la ruta, de lo contrario false.

export const mdLinks = (route, options) => {
  const promise = new Promise((resolve, reject) => {
    if (fs.existsSync(route)) {
      const arrObjLinksAndTextAndFile = readFilesMd(isDirOrFile(convertInAbsolute(route)));
      if (arrObjLinksAndTextAndFile.length > 0) {
        if (options.validate) {
          validateOption(arrObjLinksAndTextAndFile)
            .then(response => resolve(response))
            .catch(err => reject(err));
        } else {
          resolve(arrObjLinksAndTextAndFile);
        }
      } else {
        reject('No se encontraron links en los archivos .md');
      }
    } else {
      reject('La ruta colocada no existe, por favor intente con otra ruta');
    }
  });
  return promise;
};
// mdLinks('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba', {validate: true}).then(res => console.log(res));

