"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linksExtractor = exports.travelDirectory = exports.convertPath = exports.verifyPath = void 0;

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

var validateStats = function validateStats(Path) {
  var arrObj = linksExtractor(Path);
  var arrLinks = arrObj.map(function (link) {
    return fetch(link.href).then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        link.status = response.status;
        link.statusText = response.statusText;
      } else {
        link.status = response.status;
        link.statusText = 'fail';
      }
    });
  }); // console.log(arrLinks);

  return Promise.all(arrLinks).then(function () {
    return console.log(arrObj);
  }) // })
  //    console.log(arrObj);           
  //   })
  .catch(function (error) {
    return {
      error: error
    };
  });
};

validateStats("C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba"); //   
//     .then(response => {
//       const linksValidate = arrObjLinks.map((objLinkData, statsLink) => {
//         objLinkData.status = response[statsLink].status;
//         objLinkData.statusText = response[statsLink].statusText;
//         return objLinkData;
//       });
//       return linksValidate;
//     })
//  console.log(validateStats([{href: 'https://app.zeplin.io/project/5c312ecbbae2c22086d6'},{href: 'https://www.npmjs.com/package/node-fetch'}]));