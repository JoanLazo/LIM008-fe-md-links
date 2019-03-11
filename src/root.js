
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
// console.log(convertInAbsolute('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\prueba'));
// `${process.cwd(path)}/${paths.basename(path)}`; 
// dirent.isDirectory () retorna un bolean, dirent.isFile () retorna un boleano
// stats.isDirectory () Devuelve true si el fs.Statsobjeto describe un directorio de sistema de archivos, stats.isFile().
// fs.readdirSync(path[, options]) devuelve string o un directorio o buffer
// fs.readFileSync(path[, options])

export const isDirOrFile = (root) => {
  let fileArray = [];
  if (fs.statSync(root).isDirectory() === false) {
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
// console.log(readFilesMd('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'));


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

export const validateOption = (arrFiles) => { 
  const newPromise = arrFiles.map(links => new Promise((resolve, reject) => {
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
      }).catch((err) => reject(err));
  }));
  return Promise.all(newPromise);
};

// El objeto Set te permite almacenar valores únicos de cualquier tipo, incluso valores primitivos u objetos de referencia.
// const myArray = ['value1', 'value2', 'value3'];
// const mySet = new Set(myArray);
// console.log([...mySet]);

export const uniqueLinks = (arrObjLinks) => {
  const newSetLinks = [...new Set(arrObjLinks.map((links) => links.href))];
  return newSetLinks.length;
};

// console.log(uniqueLinks([ { href:
//     'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//      'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
// status: 200,
// statusText: 'OK' },
// { href: 'https://claseslaboratoria.slack.com/messages',
//   text: 'slack',
//   file:
//      'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md',
//   status: 200,
//   statusText: 'OK' },
// { href:
//      'https://Carlosazaustre.es/manejando-la-asincronia-en-javascript.1/',
// text: 'asincronia',
// file:
//      'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\roto.md',
// status: 404,
// statusText: 'Not Found' } ]));

  
export const brokenLinks = (arrObjLinksValidate) => { 
  const arrBrokenLinks = arrObjLinksValidate.filter(link => link.statusText === 'FAIL');
  return arrBrokenLinks.length;
};

// console.log(brokenLinks([{ href:
//   'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//   'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
// status: 200,
// statusText: 'OK' }, { href:
//   'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//   'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
// status: 200,
// statusText: 'OK' },
// { href: 'https://Claseslaboratori.slack.com/messages',
//   text: 'slack',
//   file:
//   'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md',
//   status: 404,
//   statusText: 'NOT FOUND' } ]));

export const totalLinks = (arrObjLinks) => {
  const totalLinks = arrObjLinks.length;
  return totalLinks;
};

// console.log(statsOption([{ href:
//     'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//     'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
// status: 200,
// statusText: 'OK' }, { href:
//     'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
// text: 'agenda',
// file:
//     'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
// status: 200,
// statusText: 'OK' },
// { href: 'https://Claseslaboratori.slack.com/messages',
//   text: 'slack',
//   file:
//     'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md',
//   status: 404,
//   statusText: 'NOT FOUND' } ]));

// validateOption('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba').then(res => { 
//   console.log(res); 
// });

// validateOption('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba').then(res => { 
//   console.log(res); 
// });
