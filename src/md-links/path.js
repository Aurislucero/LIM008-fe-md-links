const path = require('path');
const fs = require('fs');

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
const travelDirectory = (dir) => {
   let arr=[];
   const newDir = fs.readdirSync(dir);
   newDir.forEach(file=>{
   
   let newList= dir + "\\" + file;
   let statDir=fs.statSync(newList);
   if(statDir.isDirectory()){
       arr =arr.concat(travelDirectory(newList));    
   } else{
       arr.push(file);
   }
   })
   return arr;
}

/**
 *filtrar rutas con archivos md
 * 
 * @param {ruta a verificar} arrFile
 * @returns rutas con archivos md
 */
const filterMd= (arrFile)=>{
   return arrFile.filter(file=>path.extname(file)==='.md')

}
console.log(filterMd(travelDirectory('md-links')));


 

 

 


