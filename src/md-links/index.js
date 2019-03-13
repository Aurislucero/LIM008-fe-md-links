import{validateLink} from './stat.js';
import{linksExtractor} from './path.js';

linksExtractor
const fs = require('fs');
/**
 * @param {*} path 
 * @param {*} options
 * @returns ruta absoluta
 */
export const mdLinks = (pathAbsolute,options) => {
 
 return new Promise((resolve, reject) => {
     if (options.validate){
    validateLink(pathAbsolute).then(response=>resolve(response)).catch(error=>reject(error))       
   }
   else{
    return new Promise(resolve => resolve(linksExtractor(pathAbsolute)));
  } 
})
}
// mdLinks('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md',options).then(r=>console.log(r))
module.exports = mdLinks;
  