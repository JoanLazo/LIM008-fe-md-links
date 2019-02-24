import {  pathAbsolute, countPath, extractMdFiles, extractLinks } from '../src/controller.js'

const input = {
    path: 'C:\Users\ivan_\Desktop\PROYECTO MARKDOWN\LIM008-fe-md-links',
    options: '', 
};
describe('Ejecuta la libreria con una ruta y puede colocar opciones', () => {
    it('Valida si es una ruta absoluta', (done) => {
        return pathAbsolute('C:\Users\ivan_\Desktop\PROYECTO MARKDOWN\LIM008-fe-md-links')
        .then( () => getPath( 
         (obj) => {
           const result = obj.find( (route) => route.path === 'C:\Users\ivan_\Desktop\PROYECTO MARKDOWN\LIM008-fe-md-links');
           expect(result.path).toBe(true);
           done();
        }));
    });
    it('Encuentra la cantidad de archivos', (done) => {
    return countPath('C:\Users\ivan_\Desktop\PROYECTO MARKDOWN\LIM008-fe-md-links','')
    .then( () => ( 
     (path) => {
       const result = path.find( (route) => route.path === 'C:\Users\ivan_\Desktop\PROYECTO MARKDOWN');
       expect(result.path).toBe(['C:\Users\ivan_\Desktop\PROYECTO MARKDOWN\LIM008-fe-md-links']);
       done();
    }));
});
    it('Extrae los archivos .md de las rutas', (done) => {
    return extractMdFiles('C:\Users\ivan_\Desktop\PROYECTO MARKDOWN\LIM008-fe-md-links','')
    .then( () => ( 
     (path) => {
       const result = path.find( (route) => route.file === 'README.md');
       expect(result.file).toBe('README.md');
       done();
    }));
});
it('Extraer los links con un largo menos a 50 caracteres de los archivos .md', (done) => {
    return extractLinks('README.md')
    .then( () => ( 
     (path) => {
       const result = path.find( (route) => route.links === 'https://es.wikipedia.org/wiki/Markdown');
       expect(result.links).toBe('https://es.wikipedia.org/wiki/Markdown');
       done();
    }));
});
}); 
   