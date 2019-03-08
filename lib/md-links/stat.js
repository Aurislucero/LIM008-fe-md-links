"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.brokenLink = exports.uniqueAndTotalLinks = void 0;

var _path = require("./path.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// import { rejects } from 'assert';
var uniqueAndTotalLinks = function uniqueAndTotalLinks(path, options) {
  var arrLinks = (0, _path.validateLink)(path);
  return new Promise(function (resolve, reject) {
    arrLinks.then(function (response) {
      var totalLinks = response.length;
      var arrlinkhref = response.map(function (link) {
        return link.href;
      });

      var uniqueLinks = _toConsumableArray(new Set(arrlinkhref)).length;

      resolve([totalLinks, uniqueLinks]);
    }).catch(function (err) {
      return reject(err);
    });
  });
};

exports.uniqueAndTotalLinks = uniqueAndTotalLinks;
uniqueAndTotalLinks("C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1").then(function (r) {
  return console.log(r);
});

var brokenLink = function brokenLink(path, options) {
  var arrLinks = (0, _path.validateLink)(path);
  return new Promise(function (resolve, reject) {
    arrLinks.then(function (response) {
      var arrObjlinksBroken = response.filter(function (links) {
        return links.statusText === 'fail';
      }).length;
      resolve(arrObjlinksBroken);
    }).catch(function (err) {
      return reject(err);
    });
  });
}; // brokenLink('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1').then(r=>console.log(r))


exports.brokenLink = brokenLink;