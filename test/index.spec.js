import {mdLinks} from '../src/md-links/index.js';
import {verifyPath,convertPath,travelDirectory,linksExtractor, validateLink} from '../src/md-links/path.js';
import {uniqueAndTotalArrLinks,brokenLinks} from '../src/md-links/stat.js';

const input='C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1';
const outputTravelDirectory=["prueba\\prueba1\\prueba2.md"];
const outputLinkExtr= [{"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://app.zeplin.io/project/5c312ecbbae2c22086d6", "text": "prototipo-en-zeplin"}, {"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTT", "text": "prototipo-en-figma"}, {"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTT", "text": "prototipo-en-figma"}, {"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://www.figma.com/proto/eyJVJ0RkxElf4v6qa9Wanb", "text": "prototipo-en-figma"}, {"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://github.com/Aurislucer)", "text": "prototipo"}]
const outputValidateLink =[{"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://app.zeplin.io/project/5c312ecbbae2c22086d6", "status": 200, "statusText": "OK", "text": "prototipo-en-zeplin"}, {"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTT",
"status": 200, "statusText": "OK", "text": "prototipo-en-figma"}, {"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTT", "status": 200, "statusText": "OK", "text": "prototipo-en-figma"}, {"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://www.figma.com/proto/eyJVJ0RkxElf4v6qa9Wanb", "status": 200, "statusText": "OK", "text": "prototipo-en-figma"}, {"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://github.com/Aurislucer)", "status": 404, "statusText": "fail", "text": "prototipo"}]
const outputTotalUniqueLinks=[5, 4]
const outputBroken=1
describe('funcion verifyPath', () => {
    it('debería ser una función', () => {
        return expect(typeof verifyPath).toBe('function');
    });
    it('Debería retornar true si la ruta es absoluta', () => {
        expect(verifyPath('C:\\Program Files\\ruta')).toBe(true);
    });
    it('Debería retornar false si la ruta es relativa', () => {
        expect(verifyPath('.\\ruta')).toBe(false);
    });
  });
  describe('funcion convertPath',()=>{
    it('Deberia ser una función', () => {
        expect(typeof convertPath).toBe('function');
    }); 
    it('Deberia convertir la ruta relativa a absoluta', () => {
        expect(convertPath('src\\md-links\\index.js')).toEqual('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\src\\md-links\\index.js');
    });
  });

  describe('funcion travelDirectory',()=>{
      it('Deberia ser una funcion',()=>{
          expect(typeof travelDirectory).toBe('function');
      });  
      it.only('Deberia retornar un array de archivos md',()=>{
        expect(travelDirectory("./prueba")).toEqual(outputTravelDirectory);
        
    }); 
  })

  describe('funcion linksExtractor',()=>{
    it('Deberia ser una funcion',()=>{
        expect(typeof linksExtractor).toBe('function');
    });  
    it('Deberia retornar un array de objetos',()=>{
        expect(linksExtractor(input)).toEqual(outputLinkExtr);
  }); 
})

describe('funcion validateLink',()=>{
    it.only('Deberia ser una funcion',()=>{
        expect(typeof validateLink).toEqual('function');
    });  
    it('deberia retornar un array de objetos con cinco propiedades', () => {
        const arrObj= validateLink(input)
        return new Promise((resolve,reject)=>{
            arrObj.then((response) => {
                expect(response).toEqual(outputValidateLink);
                resolve(response);
            })
        })
        
    })
})

describe.only('funcion uniqueAndTotalArrLinks',()=>{
    it.only('Deberia ser una funcion',()=>{
        expect(typeof uniqueAndTotalArrLinks).toEqual('function');
    });  
    it.only('deberia retornar un array con link totales y link unicos', () => {
        const arrTotalUnique= uniqueAndTotalArrLinks(input)
        return new Promise((resolve,reject)=>{
            arrTotalUnique.then((response) => {
                expect(response).toEqual(outputTotalUniqueLinks);
                resolve(response);
            })
        })
        
    })
})

describe.only('funcion brokenLinks',()=>{
    it.only('Deberia ser una funcion',()=>{
        expect(typeof brokenLinks).toEqual('function');
    });  
    it.only('deberia retornar la cantidad de links rotos', () => {
        const linksbroken= brokenLinks(input)
        return new Promise((resolve,reject)=>{
            linksbroken.then((response) => {
                expect(response).toEqual(1);
                resolve(response);
            })
        })
        
    })
})

// describe('funcion uniqueAndTotalLinks',()=>{
//     it('Deberia ser una funcion',()=>{
//         expect(typeof uniqueAndTotalLinks).toEqual('function');
//     });  
//     it('Devuelve una promesa que resuelve a un array', (listo) => {
//                 validateStats()
//                     .then((arr) => {

//                         expect(Array.isArray(arr)).toBe(true);
//                         listo();
//                })
//     })
// })









//   describe('Funcion mdLinks', () => {

//     it('Debería se una función', () => {
//         return expect(typeof mdLinks).toBe('function')
//     });
//     it('Devuelve una promesa que resuelve a un array', (listo) => {
//         mdLinks()
//             .then((arr) => {
//                 expect(Array.isArray(arr)).toBe(true);
//                 listo();
//             })
//     })
// });



    

    
  

 