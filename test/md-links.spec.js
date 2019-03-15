import { mdLinks } from '../src/index.js';

const route = `${process.cwd()}\\test\\prueba`;
const option = {
  validate: true
};
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

const linksValidate = [ { href:
  'https://docs.google.com/spreadsheets/d/1U9GRTMn_VNtqOCQdFznTeOTuUhrQor4EP4th3ipPsKM/edit#gid=0',
text: 'agenda',
file: `${process.cwd()}\\test\\prueba\\hijo\\file.md`,
status: 200,
statusText: 'OK' },
{ href: 'https://claseslaboratoria.slack.com/messages',
  text: 'slack',
  file: `${process.cwd()}\\test\\prueba\\hijo\\hola.md`,
  status: 200,
  statusText: 'OK' },
{ href:
  'https://Carlosazaustre.es/manejando-la-asincronia-en-javascript.1/',
text: 'asincronia',
file: `${process.cwd()}\\test\\prueba\\hijo\\roto.md`,
status: 404,
statusText: 'FAIL' },
{ href: 'https://dejs.org/api/path.html',
  text: 'node-path',
  file: `${process.cwd()}\\test\\prueba\\hijo\\roto.md`,
  status: 'Link no valido',
  statusText: 'FAIL' } ];

describe('Deberia retornar un array de objetos', () => {
  it('Deberia ser una función', () => {
    return expect(typeof mdLinks).toBe('function');
  });
  it('Deberia retorna un array de objetos con las rutas, los links y el texto', (done) => {
    return mdLinks(route, option)  
      .then((arrRespuestas) => {
        expect(arrRespuestas).toEqual(arrObjFiles);
        done();
      }).catch(() => done());
  });
  it('Deberia retornar un mensaje que no encontro links', (done) => {
    return mdLinks(route, option)  
      .then(() => {
        done();
      }).catch((err) => {
        expect(err).toEqual('No se encontraron links en los archivos .md');
        done();
      });
  });
  it('Deberia retornar un array de objetos con las rutas md, los links y el texto y segun la opcion agregar el status y el statusText', (done) => {
    return mdLinks(route, option.validate)  
      .then((arrRespuestas) => {
        expect(arrRespuestas).toEqual(linksValidate);
        done();
      }).catch(() => done());
  });
  it('Deberia retornar un mensaje diciendo que la ruta colocada no existe', (done) => {
    return mdLinks(route, option)  
      .then(() => {
        done();
      }).catch((err) => {
        expect(err).toEqual('La ruta colocada no existe, por favor intente con otra ruta');
        done();
      });
  });
}); 