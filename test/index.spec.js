
import {verifyPathIsAbsolute,convertPath,travelDirectory,linksExtractor} from '../src/md-links/path.js';
import {validateLink,arrObjlinksBroken,uniqueLinks} from '../src/md-links/stat.js';

const input=`${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1`;
const inputRelative =`${process.cwd()}.\\LIM008-fe-md-links\\prueba\\prueba1`;
const outputTravelDirectoryOrFile=[`${process.cwd()}prueba\\prueba1\\prueba2.md`];
const outputLinkExtr= [{"file": `${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md`, "href": "https://app.zeplin.io/project/5c312ecbbae2c22086d6", "text": "prototipo-en-zeplin"}, {"file": `${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md`, "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTT", "text": "prototipo-en-figma"}, {"file": `${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md`, "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTT", "text": "prototipo-en-figma"}, {"file": `${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md`, "href": "https://www.figma.com/proto/eyJVJ0RkxElf4v6qa9Wanb", "text": "prototipo-en-figma"}, {"file": `${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md`, "href": "https://github.com/Aurislucer)", "text": "prototipo"}]
const outputValidateLink =[{"file": `${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md`, "href": "https://app.zeplin.io/project/5c312ecbbae2c22086d6", "status": 200, "statusText": "OK", "text": "prototipo-en-zeplin"}, {"file": `${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md`, "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTT",
"status": 200, "statusText": "OK", "text": "prototipo-en-figma"}, {"file": `${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md`, "href": "https://www.figma.com/proto/FhGoRtLdYJ8nH1sfVmZoTT", "status": 200, "statusText": "OK", "text": "prototipo-en-figma"}, {"file": `${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md`, "href": "https://www.figma.com/proto/eyJVJ0RkxElf4v6qa9Wanb", "status": 200, "statusText": "OK", "text": "prototipo-en-figma"}, {"file": `${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\prueba\\prueba1\\prueba2.md`, "href": "https://github.com/Aurislucer)", "status": 404, "statusText": "fail", "text": "prototipo"}]
const outputUniqueLinks= 4;
const outputBroken=1
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
        expect(convertPath(`${process.cwd()}src\\md-links\\index.js`)).toEqual(`${process.cwd()}C:\\Users\\Laboratoria\\Desktop\\project\\project-mdlinks\\LIM008-fe-md-links\\src\\md-links\\index.js`);
    });
  });

  describe('funcion travelDirectory',()=>{
      it('Deberia ser una funcion',()=>{
          expect(typeof travelDirectory).toBe('function');
      });  
      it('Deberia retornar un array de archivos md',()=>{
        expect(travelDirectory(`${process.cwd()}./prueba`)).toEqual(outputTravelDirectoryOrFile);
        
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
    it('Deberia ser una funcion',()=>{
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



    

    
  

 