const path = require('path');
const fs = require('fs');
export const verifyPathIsAbsolute = paths => path.isAbsolute(paths);
export const convertPath = paths => path.resolve(paths);
const myMarked= require('marked');

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
   const renderer = new myMarked.Renderer();
   arrPathMd.forEach((file)=>{ 
      // console.log('hola');
     const linksMd= fs.readFileSync(file,'utf-8');
   //   const fileContent = fs.readFileSync(ele, 'utf8');
     renderer.link = (href, title, text) => {
      arrObj.push({file: file,href: href.slice(0,51), text}) };
      myMarked(linksMd, {renderer});
      // console.log(links);
      })
      return arrObj; 
   }
   // console.log(linksExtractor('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba'));
   

   
   
  
  

  