/**
  * 
  * @param {Evalua si la ruta es absoluta o relativa} path 
  */

// path.isAbsolute()
export const pathAbsolute = (root) => {
 const isAbsolute = path.isAbsolute(root); 
 return isAbsolute;
}