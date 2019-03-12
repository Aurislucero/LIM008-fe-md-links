import{verifyPathIsAbsolute,convertPath} from './path.js';
import{arrObjlinksBroken,uniqueLinks,validateLink} from './stat.js';
const fs = require('fs');
/**
 * @param {*} path 
 * @param {*} options
 * @returns ruta absoluta
 */
const mdLinks = (path,options) => {
 let pathAbsolute;
 if(verifyPathIsAbsolute(path)===false) {pathAbsolute = convertPath(path)}
 else{pathAbsolute= path;}
 return new Promise((resolve, reject) => {
    if (options.validate && options.stats ){
            validateLink(pathAbsolute)
            .then(response=>resolve({total:response.length,broken:arrObjlinksBroken(response),unique:uniqueLinks(response)}))
            .catch(error=>reject(error))       
    }
    else if (options.stats ){
        validateLink(pathAbsolute)
        .then(response=>resolve({total:response.length,unique:uniqueLinks(response)}))
        .catch(error=>reject(error))       
    }
     if (options.validate ){
    validateLink(pathAbsolute)
    .then(response=>resolve(response))
    .catch(error=>reject(error))       
   }
   else{
    validateLink(pathAbsolute)
    .then(response=>resolve(response))
    .catch(error=>reject(error))    
   }
})
}
// mdLinks('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md',options).then(r=>console.log(r))
module.exports = mdLinks;
  
  