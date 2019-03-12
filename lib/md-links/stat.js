"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrObjlinksBroken = exports.uniqueLinks = exports.validateLink = void 0;

var _path = require("./path.js");

var _fs = require("fs");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fetch = require('node-fetch'); // import { rejects } from 'assert';

/**
*verificar si el link es valido con fetch
* 
* @param {ruta a verificar} Path
* @returns un array de objetos con cinco propiedades 
*/


var validateLink = function validateLink(Path) {
  var arrObj = (0, _path.linksExtractor)(Path);
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
        links.status = 'link sin status';
        links.statusText = 'fail';
        reject(err);
      });
    });
  });
  return Promise.all(arrLinks);
}; //  validateLink('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r));


exports.validateLink = validateLink;

var uniqueLinks = function uniqueLinks(arrObj) {
  var Linkunique = _toConsumableArray(new Set(arrObj.map(function (link) {
    return link.href;
  }))).length;

  return Linkunique;
}; // uniqueLinks('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r))


exports.uniqueLinks = uniqueLinks;

var arrObjlinksBroken = function arrObjlinksBroken(arrObj) {
  var arrObjlinksBroken = arrObj.filter(function (links) {
    return links.statusText === 'fail';
  }).length;
  return arrObjlinksBroken;
}; // arrObjlinksBroken('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r));


exports.arrObjlinksBroken = arrObjlinksBroken;