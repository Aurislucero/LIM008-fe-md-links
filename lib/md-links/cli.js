#!/usr/bin/env node
"use strict";

var _stat = require("./stat.js");

var mdLinks = require('./index.js');

var program = require('commander'); // console.log(process.argv);
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


program.arguments('<path>').option('-s, --stats', 'mostrar los unicos y rotos').option('-v, --validate', 'validar los link y mostrar si la ruta es valida').option('-h, --help', 'validar los link y mostrar si la ruta es valida').action(mdLinks).parse(process.argv);
var options = {
  validate: program.validate,
  stats: program.stats,
  help: program.help //esta es la primera posicion despues del md-links 

};
var path = program.args[0];

if (path === options.help) {
  console.log("\n Uso: \n\n$ md-links <path> <options> \n\n<path> es la ruta del directorio o el archivo \n<options> tendr\xE1n las opciones como:\n   --stats o -s, esta opcion te muestra la cantidad total de links y links unicos \n --validate o -v, muestra la ruta completa ,la url,el estado ok o fail, el estado del link #numero  \n --stats --validate o -s -v, muestra links totales, links \xFAnicos y links rotos\n");
} else if (path === options.validate || path === options.stats) {
  console.log('primero deberias ingresar una ruta, si necesitas ayuda puedes colocar el comando --help o -h');
} else if (!process.argv.slice(2).length) {
  console.log('primero deberias ingresar una ruta, si necesitas ayuda puedes colocar el comando --help o -h ');
  program.outputHelp();
} else {
  if (options.stats && !options.validate) {
    (0, _stat.validateLink)(path).then(function (response) {
      return console.log("Total: ".concat(response.length, " \nUnique: ").concat((0, _stat.uniqueLinks)(response)));
    }).catch(function (error) {
      return reject(error);
    });
  }

  if (options.validate && !options.stats) {
    mdLinks(path, options).then(function (response) {
      return console.log(response);
    });
  }

  if (options.stats && options.validate) {
    (0, _stat.validateLink)(path).then(function (response) {
      return console.log("Total: ".concat(response.length, " \nUnique: ").concat((0, _stat.uniqueLinks)(response), " \nBroken: ").concat((0, _stat.arrObjlinksBroken)(response)));
    }).catch(function (error) {
      return reject(error);
    });
  }
}