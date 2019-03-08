"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLink = exports.linksExtractor = exports.travelDirectory = exports.convertPath = exports.verifyPath = void 0;

var path = require('path');

var fs = require('fs');

var fetch = require('node-fetch');
/**
 * Verifica si la ruta es absoluta o relativa
 * 
 * @param {ruta a verificar} paths
 * @returns boolean: true si es absoluta
 *                   false si es relativa 
 */


var verifyPath = function verifyPath(paths) {
  return path.isAbsolute(paths);
};
/**
 * convertir de ruta relativa a absoluta
 * 
 * @param {ruta a verificar} paths
 * @returns ruta absoluta(string)
 */


exports.verifyPath = verifyPath;

var convertPath = function convertPath(paths) {
  return path.resolve(paths);
};
/**
 *correr  si es un directorio
 * 
 * @param {ruta a verificar} dir
 * @returns un arreglo de rutas absolutas
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
    } else {
      if (path.extname(file) === '.md') {
        arr.push(newList);
      }
    }
  });
  return arr;
};

exports.travelDirectory = travelDirectory;

var linksExtractor = function linksExtractor(arrPathsMd) {
  var arrObj = [];
  var arrPathMd = travelDirectory(arrPathsMd);
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

var validateLink = function validateLink(Path) {
  var arrObj = linksExtractor(Path);
  var arrLinks = arrObj.map(function (links) {
    return new Promise(function (resolve, reject) {
      var validateLink = fetch(links.href);
      validateLink.then(function (response) {
        //   console.log(response);
        if (response.status >= 200 && response.status < 400) {
          links.status = response.status;
          links.statusText = response.statusText;
          resolve(links);
        } else {
          links.status = response.status;
          links.statusText = 'fail';
          resolve(links);
        }
      }).catch(function (err) {
        reject(err);
      });
    });
  });
  return Promise.all(arrLinks);
}; // validateLink('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1');


exports.validateLink = validateLink;