
import {verifyPathIsAbsolute,convertPath,travelDirectory,linksExtractor} from '../src/md-links/path.js';
import {validateLink,arrObjlinksBroken,uniqueLinks} from '../src/md-links/stat.js';

const input=`${process.cwd()}\\prueba\\prueba1`;
const inputRelative ='prueba\\prueba1';
const outputTravelDirectory=[`${process.cwd()}\\prueba\\prueba1\\prueba2.md`];
const outputLinkExtr= [{"file": `${process.cwd()}\\prueba\\prueba1\\prueba2.md`, "href": "https://app.zeplin.io/project/5c312ecbbae2c22086d6b", "text": "prototipo-en-zeplin"}, {"file": `${process.cwd()}\\prueba\\prueba1\\prueba2.md`, "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTTR", "text": "prototipo-en-figma"}]
const outputValidateLink = [{"file":`${process.cwd()}\\prueba\\prueba1\\prueba2.md`, "href": "https://app.zeplin.io/project/5c312ecbbae2c22086d6b", "status": 200, "statusText": "OK", "text": "prototipo-en-zeplin"}, {"file": `${process.cwd()}\\prueba\\prueba1\\prueba2.md`, "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTTR", "status": 200, "statusText": "OK", "text": "prototipo-en-figma"}]
const outputUniqueLinks= 2;
const outputBroken=0
describe('funcion verifyPathIsAbsolute', () => {
    it('debería ser una función', () => {
        return expect(typeof verifyPathIsAbsolute).toBe('function');
    });
    it('Debería retornar true si la ruta es absoluta', () => {
        expect(verifyPathIsAbsolute(input)).toBe(true);
    });
    it('Debería retornar false si la ruta es relativa', () => {
        expect(verifyPathIsAbsolute(inputRelative)).toBe(false);
    });
  });
  describe('funcion convertPath',()=>{
    it('Deberia ser una función', () => {
        expect(typeof convertPath).toBe('function');
    }); 
    it('Deberia convertir la ruta relativa a absoluta', () => {
        expect(convertPath(inputRelative)).toEqual(`${process.cwd()}\\prueba\\prueba1`);
    });
  });

  describe('funcion travelDirectory',()=>{
      it('Deberia ser una funcion',()=>{
          expect(typeof travelDirectory).toBe('function');
      });  
      it('Deberia retornar un array de archivos md',()=>{
        expect(travelDirectory(`${process.cwd()}\\prueba\\prueba1`)).toEqual(outputTravelDirectory);
        
    }); 
  })
  
  
  describe('funcion linksExtractor',()=>{
    it('Deberia ser una funcion',()=>{
        expect(typeof linksExtractor).toBe('function');
    });  
    it('Deberia retornar un array de objetos',()=>{
        expect(linksExtractor(`${process.cwd()}\\prueba\\prueba1\\prueba2.md`)).toEqual(outputLinkExtr);
  }); 
})

describe('funcion validateLink',()=>{
    it('Deberia ser una funcion',()=>{
        expect(typeof validateLink).toEqual('function');
    });  
    it('deberia retornar un array de objetos con cinco propiedades', () => {
        const arrObj= validateLink(`${process.cwd()}\\prueba\\prueba1`)
        return new Promise((resolve,reject)=>{
            arrObj.then((response) => {
                expect(response).toEqual(outputValidateLink);
                resolve(response);
            })
        })
        
    })
})

describe('funcion uniqueLinks',()=>{
    it('Deberia ser una funcion',()=>{
        expect(typeof uniqueLinks).toEqual('function');
    });  
    it('deberia retornar la cantidad de  link unicos', () => {
            expect(uniqueLinks(outputValidateLink)).toEqual( outputUniqueLinks);   
    })
})

describe('funcion arrObjlinksBroken',()=>{
    it('Deberia ser una funcion',()=>{
        expect(typeof arrObjlinksBroken).toEqual('function');
    });  
    it('deberia retornar la cantidad de links rotos', () => {
        expect(arrObjlinksBroken(outputValidateLink)).toEqual(outputBroken);
        })
})



    

    
  

 