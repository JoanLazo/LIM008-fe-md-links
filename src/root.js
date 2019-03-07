
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
  const linkFetch = arrObjLinks.map(links => fetch(links));
  return Promise.all(linkFetch)
    .then(response => {
      const arrLinksValidate = arrObjLinks.map((objLinks, linksValidate) => {
        objLinks.status = response[linksValidate].status;
        objLinks.statusText = response[linksValidate].statusText;
        return objLinks;
      });
      return arrLinksValidate;
    });
};

// El objeto Set te permite almacenar valores únicos de cualquier tipo, incluso valores primitivos u objetos de referencia.
// const myArray = ['value1', 'value2', 'value3'];
// const mySet = new Set(myArray);
// console.log([...mySet]);

export const uniqueLinks = (arrObjLinksValidate) => {
  const newSetLinks = [...new Set(arrObjLinksValidate.map((links) => links.href))];
  return newSetLinks;
};

// console.log(uniqueLinks([{ href:
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
// { href: 'https://claseslaboratoria.slack.com/messages',
//   text: 'slack',
//   file:
//   'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md',
//   status: 200,
//   statusText: 'OK' } ]));

  
export const brokenLinks = (arrObjLinksValidate) => { 
  const arrBrokenLinks = arrObjLinksValidate.filter(link => link.status >= 400);
  return arrBrokenLinks;
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

export const statsOption = (arrObjLinksValidate) => {
  const totalLinks = arrObjLinksValidate.length;
  return totalLinks;
};
// validateOption(readFilesMd(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba'))).then(res => { 
//   console.log(res); 
// });
