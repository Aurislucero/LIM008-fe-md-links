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
   
   
   const validateStats = (Path) => {
      const arrObj = linksExtractor(Path);
     const arrLinks = arrObj.map(link => fetch(link.href)
     .then((response)=>{
      if(response.status>=200 && response.status<400){
         link.status = response.status;
         link.statusText = response.statusText;
        }else{
         link.status = response.status;
         link.statusText = 'fail';
        }
     }))
    // console.log(arrLinks);
     
     return Promise.all(arrLinks)
       .then(() => console.log(arrObj))
     
   // })
   //    console.log(arrObj);           
   //   })
     .catch((error) => ({
      error
     }))
   }

   validateStats('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba');  
     
   //   
   //     .then(response => {
   //       const linksValidate = arrObjLinks.map((objLinkData, statsLink) => {
   //         objLinkData.status = response[statsLink].status;
   //         objLinkData.statusText = response[statsLink].statusText;
   //         return objLinkData;
   //       });
   //       return linksValidate;
   //     })
   

//  console.log(validateStats([{href: 'https://app.zeplin.io/project/5c312ecbbae2c22086d6'},{href: 'https://www.npmjs.com/package/node-fetch'}]));
 