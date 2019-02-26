import { pathAbsolute, countPath, extractMdFiles, extractLinks } from '../src/controller.js';

// const input = {
//     path: 'C:\Users\ivan_\Desktop\PROYECTO MARKDOWN\LIM008-fe-md-links',
//     options: '', 
// };


describe('Ejecuta la libreria con una ruta y puede colocar opciones', () => {
  it('Valida si es una ruta absoluta', () => {
    return expect(typeof pathAbsolute).toBe('función');
  });
  it('Deberia retornar true si la ruta es absoluta', () => {
    expect(pathAbsolute('C:\Users\ivan_\Desktop\PROYECTO MARKDOWN\LIM008-fe-md-links')).toBe(true);
  });
  it('Deberia retornar true si la ruta es absoluta', () => {
    expect(pathAbsolute('LIM008-fe-md-links')).toBe(false);
  });
}); 

describe('Abre directorios hasta encontrar archivos', () => {
  it('Encuentra la cantidad de archivos', () => {
    return expect(typeof countPath).toBe('función');
  });
  it('')
}); 

it('Extrae los archivos .md de las rutas', (done) => {
  return extractMdFiles('C:\Users\ivan_\Desktop\PROYECTO MARKDOWN\LIM008-fe-md-links', '')
    .then(() => ( 
      (path) => {
        const result = path.find((route) => route.file === 'README.md');
        expect(result.file).toBe('README.md');
        done();
      }));
});
it('Extraer los links con un largo menos a 50 caracteres de los archivos .md', (done) => {
  return extractLinks('README.md')
    .then(() => ( 
      (path) => {
        const result = path.find((route) => route.links === 'https://es.wikipedia.org/wiki/Markdown');
        expect(result.links).toBe('https://es.wikipedia.org/wiki/Markdown');
        done();
      }));
});
   