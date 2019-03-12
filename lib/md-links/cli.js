#!/usr/bin/env node
const mdLinks = require('./index.js')
var program = require('commander');
// console.log(process.argv);


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
else{
mdLinks(path,options).then(response=>{
if (options.stats && !options.validate){
    console.log(`Total: ${response.total} \nUnique: ${response.unique}`);
}
if (options.validate && !options.stats){
    response.forEach(links => {
        console.log(`${links.file}\t${links.href}\t${links.statusText}\t${links.status}\t${links.text}`)
      });
} 
if ( options.stats && options.validate){
    console.log(`Total: ${response.total} \nUnique: ${response.unique} \nBroken: ${response.broken}`);
} 

else{
    response.forEach(links => {
        console.log(`${links.file}\t${links.href}\t${links.text}`)
      }); 
}
})

}

