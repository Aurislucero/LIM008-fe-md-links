import{linksExtractor} from './path.js';
const fetch = require( 'node-fetch') ; 
// import { rejects } from 'assert';

  /**
 *verificar si el link es valido con fetch
 * 
 * @param {ruta a verificar} Path
 * @returns un array de objetos con cinco propiedades 
 */


  
export const validateLink = (Paths) => {
    const arrObjs = linksExtractor(Paths);
   const ValidatesarrObj = arrObjs.map(arrObj => new Promise((resolve,reject)=>{
    const validateLink=fetch(arrObj.href)
    validateLink.then((response)=>{
     //   console.log(response);
        if(response.status>=200 && response.status<400){
          arrObj.status = response.status;
          arrObj.statusText = response.statusText;
        resolve(arrObj)
       }else{
        arrObj.status = response.status;
        arrObj.statusText = 'fail';
        resolve(arrObj)
       }
    })
    .catch(err=>{
      arrObj.status = 'link sin status';
      arrObj.statusText = 'fail';
       resolve(arrObj)
     })
   }))
  return Promise.all(ValidatesarrObj)
  
 }

 
//  validateLink('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r));
export const uniqueLinks = (arrObj)=>{
        const Linkunique =[...new Set(arrObj.map(link=>link.href))].length
        return Linkunique;
}
// uniqueLinks('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r))
export const arrObjlinksBroken = (arrObj)=>{
       const arrObjlinksBroken = arrObj.filter(links => links.statusText === 'fail').length
       return arrObjlinksBroken;
    }  
// arrObjlinksBroken('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r));







