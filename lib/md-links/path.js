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

exports.convertPath = convertPath;

var myMarked = require('marked');
/**
 *correr  si es un directorio
 * 
 * @param {ruta a verificar} dir
 * @returns un arreglo de rutas  md
 */


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

  var renderer = new myMarked.Renderer();
  arrPathMd.forEach(function (file) {
    // console.log('hola');
    var linksMd = fs.readFileSync(file, 'utf-8'); //   const fileContent = fs.readFileSync(ele, 'utf8');

    renderer.link = function (href, title, text) {
      arrObj.push({
        file: file,
        href: href.slice(0, 51),
        text: text
      });
    };

    myMarked(linksMd, {
      renderer: renderer
    }); // console.log(links);
  });
  return arrObj;
}; // console.log(linksExtractor('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba'));


exports.linksExtractor = linksExtractor;