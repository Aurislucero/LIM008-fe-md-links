#!/usr/bin/env node
import{uniqueLinks,validateLink,arrObjlinksBroken} from './stat.js';
import{mdLinks} from './index.js';
var program = require('commander');
// console.log(process.argv);

// program
//   .usage('<path> [options]')
//   .arguments('<path>')
//   .option('-s, --stats', 'mostrar los unicos y rotos')
//   .option('-v, --validate', 'validar los link y mostrar si la ruta es valida')
//   .option('-h, --help', 'validar los link y mostrar si la ruta es valida')
//   .action((path,options)=>{
//   console.log(path);
// console.log(options);
//   })
//   .parse(process.argv);
// if(!process.argv.slice(2).length){
//   program.outputHelp();   
// }
program
  .arguments('<path>')
  .option('-s, --stats', 'mostrar los unicos y rotos')
  .option('-v, --validate', 'validar los link y mostrar si la ruta es valida')
  .option('-h, --help', 'validar los link y mostrar si la ruta es valida')
  .action(mdLinks)
  .parse(process.argv);

let options = {
validate:program.validate,
stats:program.stats,
help:program.help
}
//esta es la primera posicion despues del md-links 
const path = program.args[0];

if(path===options.help){
    console.log(`\n Uso: \n\n$ md-links <path> <options> \n\n<path> es la ruta del directorio o el archivo \n<options> tendrán las opciones como:
   --stats o -s, esta opcion te muestra la cantidad total de links y links unicos \n --validate o -v, muestra la ruta completa ,la url,el estado ok o fail, el estado del link #numero  \n --stats --validate o -s -v, muestra links totales, links únicos y links rotos\n`);
}
else if(path === options.validate ||path === options.stats){
    console.log('primero deberias ingresar una ruta, si necesitas ayuda puedes colocar el comando --help o -h');
}
else if(!process.argv.slice(2).length){
    console.log('primero deberias ingresar una ruta, si necesitas ayuda puedes colocar el comando --help o -h ');
    program.outputHelp();
}
else{

if (options.stats && !options.validate){
    validateLink(path)
    .then(response=>console.log(`Total: ${response.length} \nUnique: ${uniqueLinks(response)}`))
    .catch(error=>reject(error))      
}
else if (options.validate && !options.stats){
    mdLinks(path,options)
    .then(response=>console.log(response))
    .catch(err=>console.log(err))
}

 else if ( options.stats && options.validate){
     validateLink(path)
     .then(response=>console.log(`Total: ${response.length} \nUnique: ${uniqueLinks(response)} \nBroken: ${arrObjlinksBroken(response)}`))
     .catch(error=>reject(error)) 
 } 
 else if(!options.validate && !options.stats){
    mdLinks(path,options)
    .then(response=>console.log(response))
}
}





