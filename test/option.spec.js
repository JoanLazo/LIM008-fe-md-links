import { validateOption, uniqueLinks, brokenLinks, statsOption } from '../src/root.js';

const arrObjFiles = [ { href:
    'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
text: 'agenda',
file:
    'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md' },
{ href: 'https://claseslaboratoria.slack.com/messages',
  text: 'slack',
  file:
    'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md' },
{ href:
    'https://Carlosazaustre.es/manejando-la-asincronia-en-javascript.1/',
text: 'asincronia',
file:
    'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\roto.md' } ];

const linksValidate = [ { href:
    'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
text: 'agenda',
file:
    'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
status: 200,
statusText: 'OK' },
{ href: 'https://claseslaboratoria.slack.com/messages',
  text: 'slack',
  file:
    'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md',
  status: 200,
  statusText: 'OK' },
{ href:
    'https://Carlosazaustre.es/manejando-la-asincronia-en-javascript.1/',
text: 'asincronia',
file:
    'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\roto.md',
status: 404,
statusText: 'Not Found' } ];

const uniqueL = 1;

const brokenL = 1; 

const totalLinks = 3;

describe('Deberia validar los links mostrado el status y el statusText', () => {
  it('Deberia ser una función', () => {
    return expect(typeof validateOption).toBe('function');
  });
  it('Deberia validar el array de objetos de links y agregar el status y el statusText', (done) => {
    return validateOption(arrObjFiles)
      .then((arrObjFiles) => {
        expect(arrObjFiles).toEqual(linksValidate);
        done();
      });
  });
}); 
describe('Deberia mostrar el array de objetos de los links unicos', () => {
  it('Deberia ser una función', () => {
    return expect(typeof uniqueLinks).toBe('function');
  });
  it('Deberia tener un array de objetos unicos con los links validados', () => {
    expect(uniqueLinks(linksValidate)).toEqual(uniqueL);
  });
}); 

describe('Deberia mostrar el array de objetos de los links rotos', () => {
  it('Deberia ser una función', () => {
    return expect(typeof brokenLinks).toBe('function');
  });
  it('Deberia tener un array de objetos con los links rotos', () => {
    expect(brokenLinks(linksValidate)).toEqual(brokenL);
  });
}); 
  
describe('Deberia mostrar la cantidad total de links', () => {
  it('Deberia ser una función', () => {
    return expect(typeof statsOption).toBe('function');
  });
  it('Deberia tener la cantidad de links totales de la respuesta de validate', () => {
    expect(statsOption(linksValidate)).toBe(totalLinks);
  });
}); 