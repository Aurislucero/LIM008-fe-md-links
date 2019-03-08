import {mdLinks} from '../src/md-links/index.js';
import {verifyPath,convertPath,travelDirectory,linksExtractor,validateStats} from '../src/md-links/path.js';


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

  describe('funcion verifyDirectory',()=>{
      it('Deberia ser una funcion',()=>{
          expect(typeof travelDirectory).toBe('function');
      });  
      it('Deberia retornar un array de archivos md',()=>{
        expect(travelDirectory("./prueba")).toBe(['prueba2.md','prueba3.md']);
        
    }); 
  })

  describe('funcion linksExtractor',()=>{
    it('Deberia ser una funcion',()=>{
        expect(typeof linksExtractor).toBe('function');
    });  
    it('Deberia retornar un array de objetos',()=>{
        expect(linksExtractor('C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1')).toEqual([{"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://app.zeplin.io/project/5c312ecbbae2c22086d6", "text": "prototipo-en-zeplin"}, {"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTT", "text": "prototipo-en-figma"}, {"file": "C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md", "href": "https://medium.com/netscape/a-guide-to-create-a-no", "text": "prototipo-en-figma"}]);
  }); 
})

describe.only('funcion validateStats',()=>{
    it.only('Deberia ser una funcion',()=>{
        expect(typeof validateStats).toEqual('function');
    });  
    it('Devuelve una promesa que resuelve a un array', (listo) => {
                validateStats()
                    .then((arr) => {
                        expect(Array.isArray(arr)).toBe(true);
                        listo();
                    })
    })
})









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



    

    
  

 