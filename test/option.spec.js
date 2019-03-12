import { validateOption, uniqueLinks, brokenLinks, totalLinks } from '../src/root.js';

const arrObjFiles = [ { href:
    'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
text: 'agenda',
file:
    'C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md' },
{ href: 'https://claseslaboratoria.slack.com/messages',
  text: 'slack',
  file:
    'C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md' },
{ href:
    'https://Carlosazaustre.es/manejando-la-asincronia-en-javascript.1/',
text: 'asincronia',
file:
    'C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\roto.md' } ];

const linksValidate = [ { href:
    'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
text: 'agenda',
file:
    'C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md',
status: 200,
statusText: 'OK' },
{ href: 'https://claseslaboratoria.slack.com/messages',
  text: 'slack',
  file:
    'C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md',
  status: 200,
  statusText: 'OK' },
{ href:
    'https://Carlosazaustre.es/manejando-la-asincronia-en-javascript.1/',
text: 'asincronia',
file:
    'C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\roto.md',
status: 404,
statusText: 'FAIL' } ];

const uniqueL = 3;

const brokenL = 1; 

const totalL = 3;

describe('Deberia retornar un array de objetos de los links más el status y el statusText', () => {
  it('Deberia ser una función', () => {
    return expect(typeof validateOption).toBe('function');
  });
  it('Deberia validar el array de objetos de links y agregar el status y el statusText', (done) => {
    return validateOption(arrObjFiles)  
      .then((arrRespuestas) => {
        expect(arrRespuestas).toEqual(linksValidate);
        done();
      }).catch(() => done());
  });
}); 
describe('Deberia retornar el array de objetos de los links unicos', () => {
  it('Deberia ser una función', () => {
    return expect(typeof uniqueLinks).toBe('function');
  });
  it('Deberia tener un array de objetos unicos con los links validados', () => {
    expect(uniqueLinks(linksValidate)).toEqual(uniqueL);
  });
}); 

describe('Deberia retornar el array de objetos de los links rotos', () => {
  it('Deberia ser una función', () => {
    return expect(typeof brokenLinks).toBe('function');
  });
  it('Deberia tener un array de objetos con los links rotos', () => {
    expect(brokenLinks(linksValidate)).toEqual(brokenL);
  });
}); 
  
describe('Deberia retornar la cantidad total de links', () => {
  it('Deberia ser una función', () => {
    return expect(typeof totalLinks).toBe('function');
  });
  it('Deberia tener la cantidad de links totales de la respuesta de validate', () => {
    expect(totalLinks(linksValidate)).toBe(totalL);
  });
}); 