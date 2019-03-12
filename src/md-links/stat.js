import { linksExtractor } from './path.js';
const fetch = require( 'node-fetch') ; 

// import { rejects } from 'assert';

  /**
 *verificar si el link es valido con fetch
 * 
 * @param {ruta a verificar} Path
 * @returns un array de objetos con cinco propiedades 
 */
export const validateLink = (Path) => {
    const arrObj = linksExtractor(Path);
   const arrLinks = arrObj.map(links => new Promise((resolve,reject)=>{
    const validateLink=fetch(links.href)
    validateLink.then((response)=>{
     //   console.log(response);
        if(response.status>=200 && response.status<400){
        links.status = response.status;
        links.statusText = response.statusText;
        resolve(links)
       }else{
        links.status = response.status;
        links.statusText = 'fail';
        resolve(links)
       }
    })
    .catch(err=>{
       links.status = 'link sin status';
       links.statusText = 'fail';
       reject(err)
     })
   }))
  return Promise.all(arrLinks)
  
 }
//  validateLink('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r));
export const uniqueLinks = (arrObj)=>{
        const Linkunique =[...new Set(arrObj.map(link=>link.href))].length
        return Linkunique 
}
// uniqueLinks('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r))
export const arrObjlinksBroken = (arrObj)=>{
        const arrObjlinksBroken = arrObj.filter(links => links.statusText === 'fail').length
        return arrObjlinksBroken
    }  
// arrObjlinksBroken('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r));







