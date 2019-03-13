"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _stat = require("./stat.js");

var _path = require("./path.js");

var options = {
  validate: false
};

var fs = require('fs');
/**
 * @param {*} path 
 * @param {*} options
 * @returns ruta absoluta
 */


var mdLinks = function mdLinks(pathAbsolute, options) {
  return new Promise(function (resolve, reject) {
    if (options.validate) {
      (0, _stat.validateLink)(pathAbsolute).then(function (response) {
        return resolve(response);
      }).catch(function (error) {
        return reject(error);
      });
    } else if (!options.validate) {
      resolve((0, _path.linksExtractor)(pathAbsolute));
    }
  });
}; // mdLinks('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md',options).then(r=>console.log(r))


exports.mdLinks = mdLinks;
module.exports = mdLinks;