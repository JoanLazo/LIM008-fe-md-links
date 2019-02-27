import { pathAbsolute, searchFiles, valideMdFiles } from '../src/root.js';

describe('Ejecuta la libreria con una ruta y puede colocar opciones', () => {
  it('Es una ruta absoluta', () => {
    return expect(typeof pathAbsolute).toBe('function');
  });
  it('Deberia retornar true si la ruta es absoluta', () => {
    expect(pathAbsolute('C:\Users\ivan_\Desktop')).toBe('true');
  });
  it('Deberia retornar true si la ruta es absoluta', () => {
    expect(pathAbsolute('LIM008-fe-md-links')).toBe(false);
  });
}); 

describe('Abre directorios hasta encontrar archivos', () => {
  it('Encuentra la cantidad de archivos', () => {
    return expect(typeof searchFiles).toBe('function');
  });
  it('Deberia abrir la ruta del directorio', () => {
    expect(searchFiles('C:\Users\ivan_\Desktop\PROYECTO MARKDOWN')).toBe(true);
  });
  it('Deberia tener la ruta de los archivos', () => {
    expect(searchFiles('C:\Users\ivan_\Desktop\PROYECTO MARKDOWN\LIM008-fe-md-links\README.md').toBe(false));
  });
}); 

describe('Extrae los archivo con extensión .md', () => {
  it('Es una función que valida si es un archivo .md', () => {
    return expect(typeof valideMdFiles).toBe('function');
  });
  it('Es un archivo .md', () => {
    expect(valideMdFiles('README.md')).toBe(true);
  });
  it('No es un archivo .md', () => {
    expect(valideMdFiles('index.js').toBe(false));
  });
}); 
