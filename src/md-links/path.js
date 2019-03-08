const path = require('path');
const fs = require('fs');
const fetch = require( 'node-fetch') ;  
/**
 * Verifica si la ruta es absoluta o relativa
 * 
 * @param {ruta a verificar} paths
 * @returns boolean: true si es absoluta
 *                   false si es relativa 
 */
export const verifyPath = (paths) => {
   return  path.isAbsolute(paths); 
}
/**
 * convertir de ruta relativa a absoluta
 * 
 * @param {ruta a verificar} paths
 * @returns ruta absoluta(string)
 */
export const convertPath = (paths) => {
   return path.resolve(paths);
}

/**
 *correr  si es un directorio
 * 
 * @param {ruta a verificar} dir
 * @returns un arreglo de rutas absolutas
 */
export const travelDirectory = (dir) => {
   let arr=[];
   const newDir = fs.readdirSync(dir);
   newDir.forEach(file=>{
  let newList= path.join(dir,file);
   let statDir=fs.statSync(newList);
   if(statDir.isDirectory()){
       arr =arr.concat(travelDirectory(newList));    
   } else{
       if(path.extname(file)==='.md'){
           arr.push(newList);
       }
       
   }
   })
   return arr;
}

export const linksExtractor = (arrPathsMd) => {
   let arrObj = [];
   const arrPathMd= travelDirectory(arrPathsMd);
   arrPathMd.forEach((link)=>{ 
      // console.log('hola');
     const linksMd= fs.readFileSync(link,'utf-8');
      const expRLinks = /(^|[^!])\[(.*)\]\(((.*)\))/gm;
      let links = expRLinks.exec(linksMd);
      // console.log(links);
      
      while(links !== null){
         arrObj.push({
            file: link,
            text: links[2],
            href: links[3].substring(0,50)

          })
      links=  expRLinks.exec(linksMd);
      }
      })
      return arrObj; 
   }
   // console.log(linksExtractor('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba'));
   
   
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
         reject(err)
       })
     }))
    return Promise.all(arrLinks)
    
   }
   // validateLink('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1');
   
   
  
  

  