import { pathAbsolute, convertInAbsolute, isDirOrFile, readFilesMd } from '../src/root.js';

const files = [`${process.cwd()}\\test\\prueba\\hijo\\file.md`, 
  `${process.cwd()}\\test\\prueba\\hijo\\hola.md`,
  `${process.cwd()}\\test\\prueba\\hijo\\roto.md`];

const arrObjFiles = [ { href:
  'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
text: 'agenda',
file: `${process.cwd()}\\test\\prueba\\hijo\\file.md` },
{ href: 'https://claseslaboratoria.slack.com/messages',
  text: 'slack',
  file: `${process.cwd()}\\test\\prueba\\hijo\\hola.md` },
{ href:
  'https://Carlosazaustre.es/manejando-la-asincronia-en-javascript.1/',
text: 'asincronia',
file: `${process.cwd()}\\test\\prueba\\hijo\\roto.md` },
{
  'href': 'https://dejs.org/api/path.html',
  'text': 'node-path',
  'file': `${process.cwd()}\\test\\prueba\\hijo\\roto.md`,
}, ];

describe('Deberia evaluar la ruta', () => {
  it('Deveria ser una función', () => {
    return expect(typeof pathAbsolute).toBe('function');
  });
  it('Deberia retornar true si la ruta es absoluta', () => {
    expect(pathAbsolute(`${process.cwd()}\\src\\main.js`)).toBe(true);
  });
  it('Deberia retornar false si la ruta es relativa', () => {
    expect(pathAbsolute('LIM008-fe-md-links\\src\\main.js')).toBe(false);
  });
}); 

describe('Deberia convertir una ruta relativa en absoluta', () => {
  it('Deberia ser una función', () => {
    return expect(typeof convertInAbsolute).toBe('function');
  });
  it('Deberia convertir la ruta en absoluta', () => {
    expect(convertInAbsolute(`${process.cwd()}\\src\\main.js`)).toEqual(`${process.cwd()}\\src\\main.js`);
  });
  it('Deberia convertir la ruta en absoluta', () => {
    expect(convertInAbsolute('src\\main.js')).toBe(`${process.cwd()}\\src\\main.js`);
  });
}); 

describe('Deberia acummular un array con las rutas de los archivos', () => {
  it('Deberia ser una función', () => {
    return expect(typeof isDirOrFile).toBe('function');
  });
  it('Deberia retornar un array con las rutas de los archivos .md', () => {
    expect(isDirOrFile('README.md')).toEqual(['README.md']);
  });
  it('Deberia retornar un array con las rutas de los archivos .md', () => {
    expect(isDirOrFile(`${process.cwd()}\\test\\prueba`)).toEqual(files);
  });
}); 


describe('Deberia extraer los links md en un array de objetos', () => {
  it('Deberia ser una función', () => {
    return expect(typeof readFilesMd).toBe('function');
  });
  it('Deberia extraer el link , su nombre y ya ruta de los archivos .md', () => {
    expect(readFilesMd(files)).toEqual(arrObjFiles);
  });
}); 
