import { pathAbsolute, convertInAbsolute, isDirOrFile, isMdFiles } from '../src/root.js';

const files = ['C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\file.md', 'C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\test\\prueba\\hijo\\hola.md'];

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

describe('Deberia extraer el contenido del archivo .md', () => {
  it('Deberia ser una función', () => {
    return expect(typeof isMdFiles).toBe('function');
  });
  it('Deberia ser un archivo .md', () => {
    expect(isMdFiles('file.md')).toBe('.md');
  });
}); 
