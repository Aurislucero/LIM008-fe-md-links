const path = require('path');
const fs = require('fs');
export const verifyPathIsAbsolute = paths => path.isAbsolute(paths);
export const convertPath = paths => path.resolve(paths);

/**
 *correr  si es un directorio
 * 
 * @param {ruta a verificar} dir
 * @returns un arreglo de rutas  md
 */
 export const travelDirectory = (dir) => {
   let arr=[];
   const newDir = fs.readdirSync(dir);
   newDir.forEach(file=>{
  let newList= path.join(dir,file);
   let statDir=fs.statSync(newList);
   if(statDir.isDirectory()){
       arr =arr.concat(travelDirectory(newList));    
   } else if(statDir.isFile() && path.extname(file)==='.md'){  
           arr.push(newList);    
   }
   })
   return arr; 
}
/**
 *correr  si es un archivo
 * 
 * @param {ruta a verificar} paths
 * @returns un arreglo de rutas md
 */
  const travelFile = (paths) => {
   let arr=[];
   const statsFile = fs.statSync(paths)
   if(statsFile.isFile() && path.extname(paths) === '.md'){
      arr.push(paths);
  }
  return arr; 
}
// console.log(travelFile('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md'));
/**
 *extraer links
 * 
 * @param {ruta a verificar} arrPathsMd
 * @returns un array de objetos con tres propiedades
 */
export const linksExtractor = (arrPathsMd) => {
   let pathAbsolutemd;
   if(verifyPathIsAbsolute(arrPathsMd)===false) {pathAbsolutemd = convertPath(arrPathsMd)}
   else{pathAbsolutemd=arrPathsMd;}
   let arrObj = [];
   let arrPathMd;
   if(fs.statSync(pathAbsolutemd).isFile()){
       arrPathMd= travelFile(pathAbsolutemd);
   }
   else if(fs.statSync(pathAbsolutemd).isDirectory()){
      arrPathMd= travelDirectory(pathAbsolutemd);
   }
   
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
   

   
   
  
  

  