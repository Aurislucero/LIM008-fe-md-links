import {validateLink} from './path.js';
// import { rejects } from 'assert';

export const uniqueAndTotalArrLinks = (path)=>{
    const arrLinks=validateLink(path)
    return new Promise((resolve,reject)=>{
        arrLinks.then(response=>{
            const totalLinks =response.length;
            const arrlinkhref= response.map(link=>link.href)
            const uniqueLinks =[...new Set(arrlinkhref)].length; 
            resolve([totalLinks,uniqueLinks])
        }) .catch(err=>reject(err))
    })    
}
uniqueAndTotalArrLinks('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r))

export const brokenLinks = (path)=>{
    const arrLinks=validateLink(path) 
    return new Promise((resolve,reject)=>{
        arrLinks.then(response=>{
            const arrObjlinksBroken = response.filter(links => links.statusText === 'fail').length
            resolve(arrObjlinksBroken);
        }).catch(err=>reject(err)) 
    })}
    // brokenLink('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r))







