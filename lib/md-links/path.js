"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linksExtractor = exports.travelDirectory = exports.convertPath = exports.verifyPathIsAbsolute = void 0;

var path = require('path');

var fs = require('fs');

var verifyPathIsAbsolute = function verifyPathIsAbsolute(paths) {
  return path.isAbsolute(paths);
};

exports.verifyPathIsAbsolute = verifyPathIsAbsolute;

var convertPath = function convertPath(paths) {
  return path.resolve(paths);
};
/**
 *correr  si es un directorio
 * 
 * @param {ruta a verificar} dir
 * @returns un arreglo de rutas  md
 */


exports.convertPath = convertPath;

var travelDirectory = function travelDirectory(dir) {
  var arr = [];
  var newDir = fs.readdirSync(dir);
  newDir.forEach(function (file) {
    var newList = path.join(dir, file);
    var statDir = fs.statSync(newList);

    if (statDir.isDirectory()) {
      arr = arr.concat(travelDirectory(newList));
    } else if (statDir.isFile() && path.extname(file) === '.md') {
      arr.push(newList);
    }
  });
  return arr;
};
/**
 *correr  si es un archivo
 * 
 * @param {ruta a verificar} paths
 * @returns un arreglo de rutas md
 */


exports.travelDirectory = travelDirectory;

var travelFile = function travelFile(paths) {
  var arr = [];
  var statsFile = fs.statSync(paths);

  if (statsFile.isFile() && path.extname(paths) === '.md') {
    arr.push(paths);
  }

  return arr;
}; // console.log(travelFile('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md'));

/**
 *extraer links
 * 
 * @param {ruta a verificar} arrPathsMd
 * @returns un array de objetos con tres propiedades
 */


var linksExtractor = function linksExtractor(arrPathsMd) {
  var pathAbsolutemd;

  if (verifyPathIsAbsolute(arrPathsMd) === false) {
    pathAbsolutemd = convertPath(arrPathsMd);
  } else {
    pathAbsolutemd = arrPathsMd;
  }

  var arrObj = [];
  var arrPathMd;

  if (fs.statSync(pathAbsolutemd).isFile()) {
    arrPathMd = travelFile(pathAbsolutemd);
  } else if (fs.statSync(pathAbsolutemd).isDirectory()) {
    arrPathMd = travelDirectory(pathAbsolutemd);
  }

  arrPathMd.forEach(function (link) {
    // console.log('hola');
    var linksMd = fs.readFileSync(link, 'utf-8');
    var expRLinks = /(^|[^!])\[(.*)\]\(((.*)\))/gm;
    var links = expRLinks.exec(linksMd); // console.log(links);

    while (links !== null) {
      arrObj.push({
        file: link,
        text: links[2],
        href: links[3].substring(0, 50)
      });
      links = expRLinks.exec(linksMd);
    }
  });
  return arrObj;
}; // console.log(linksExtractor('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba'));


exports.linksExtractor = linksExtractor;