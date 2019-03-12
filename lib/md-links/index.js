"use strict";

var _path = require("./path.js");

var _stat = require("./stat.js");

var fs = require('fs');

var path = require('path');

var fetch = require('node-fetch');
/**
 * @param {*} route 
 * @param {*} options
 * @returns 
 */
// const options = {
//     validate:false,
//     stats:false
// }


var mdLinks = function mdLinks(path, options) {
  var pathAbsolute;

  if ((0, _path.verifyPathIsAbsolute)(path) === false) {
    pathAbsolute = (0, _path.convertPath)(path); // console.log(pathAbsolute);
  } else {
    pathAbsolute = path; // console.log(pathAbsolute);    
  }

  return new Promise(function (resolve, reject) {
    if (options.validate && options.stats) {
      (0, _stat.validateLink)(pathAbsolute).then(function (response) {
        return resolve({
          total: response.length,
          broken: (0, _stat.arrObjlinksBroken)(response),
          unique: (0, _stat.uniqueLinks)(response)
        });
      }).catch(function (error) {
        return reject(error);
      });
    } else if (options.stats) {
      (0, _stat.validateLink)(pathAbsolute).then(function (response) {
        return resolve({
          total: response.length,
          unique: (0, _stat.uniqueLinks)(response)
        });
      }).catch(function (error) {
        return reject(error);
      });
    }

    if (options.validate) {
      (0, _stat.validateLink)(pathAbsolute).then(function (response) {
        return resolve(response);
      }).catch(function (error) {
        return reject(error);
      });
    } else {
      (0, _stat.validateLink)(pathAbsolute).then(function (response) {
        return resolve(response);
      }).catch(function (error) {
        return reject(error);
      });
    }
  });
}; // mdLinks('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md',options).then(r=>console.log(r))


module.exports = mdLinks;