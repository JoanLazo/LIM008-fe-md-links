import { pathAbsolute, convertInAbsolute, searchFiles, valideMdFiles } from '../src/root.js';

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
<<<<<<< HEAD
});
=======
}); 
>>>>>>> 948ed06a39de0c00151b714c519d6555ab90e15b

describe('Deberia convertir una ruta relativa en absoluta', () => {
  it('Deberia ser una función', () => {
    return expect(typeof convertInAbsolute).toBe('function');
  });
  it('Deberia convertir la ruta en absoluta', () => {
    return expect(convertInAbsolute('src\\main.js')).toBe('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\src\\main.js');
  });
<<<<<<< HEAD
});
=======
}); 
>>>>>>> 948ed06a39de0c00151b714c519d6555ab90e15b

describe('Deberia verificar si es directorio', () => {
  it('Deberia ser una función', () => {
    return expect(typeof searchFiles).toBe('function');
  });
  it('Deberia abrir la ruta del directorio', () => {
    expect(searchFiles('C:\\Users\\Laboratoria\\Documents\\PROYECTO MARKDOWN\\LIM008-fe-md-links')).toBe(true);
  });
  it('Deberia tener la ruta de un archivo', () => {
    expect(searchFiles('C:\\Users\\ivan_\\Desktop\\PROYECTO MARKDOWN\\LIM008-fe-md-links\\README.md').toBe(false));
  });
}); 

describe('Deberia extraer los archivo con extensión .md', () => {
  it('Deberia ser una función que verifica si es un archivo .md', () => {
    return expect(typeof valideMdFiles).toBe('function');
  });
  it('Deberia ser un archivo .md', () => {
    expect(valideMdFiles('README.md')).toBe(true);
  });
  it('Deberia no ser un archivo md', () => {
    expect(valideMdFiles('').toBe(false));
  });
<<<<<<< HEAD
}); 
=======
}); 
>>>>>>> 948ed06a39de0c00151b714c519d6555ab90e15b
