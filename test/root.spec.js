import { pathAbsolute, convertInAbsolute, isDirOrFile, readFilesMd } from '../src/root.js';

const files = ['C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md', 'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md'];

const arrFiles = [ { href:
  'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
text: 'agenda',
file:
  'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md' },
{ href: 'https://claseslaboratoria.slack.com/messages',
  text: 'slack',
  file:
  'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md' } ];


describe('Deberia evaluar la ruta', () => {
  it('Deveria ser una función', () => {
    return expect(typeof pathAbsolute).toBe('function');
  });
  it('Deberia retornar true si la ruta es absoluta', () => {
    expect(pathAbsolute('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\src\\main.js')).toBe(true);
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
    expect(convertInAbsolute('src\\main.js')).toBe('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\src\\main.js');
  });
}); 

describe('Deberia acummular un array con las rutas de los archivos', () => {
  it('Deberia ser una función', () => {
    return expect(typeof isDirOrFile).toBe('function');
  });
  it('Deberia retornar un array con las rutas de los archivos .md', () => {
    expect(isDirOrFile('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba')).toEqual(files);
  });
}); 


describe('Deberia extraer los links md en un array de objetos', () => {
  it('Deberia ser una función', () => {
    return expect(typeof readFilesMd).toBe('function');
  });
  it('Deberia extraer el link , su nombre y ya ruta de los archivos .md', () => {
    expect(readFilesMd(files)).toEqual(arrFiles);
  });
}); 
