import {mdLinks} from '../src/md-links/index.js';
import {verifyPath,convertPath,verifyIsFile,verifyDirectory,filterMd} from '../src/md-links/path.js';


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
          expect(typeof verifyDirectory).toBe('function');
      });
   
     
  })

  describe('funcion filterMd',()=>{
    it.only('Deberia ser una funcion',()=>{
        expect(typeof filterMd).toBe('function');
    });
})





  describe('Funcion mdLinks', () => {

    it('Debería se una función', () => {
        return expect(typeof mdlinks).toBe('function')
    });

    it('Devuelve una promesa que resuelve a un array', (listo) => {
        mdLinks()
            .then((arr) => {
                expect(Array.isArray(arr)).toBe(true);
                listo();
            })
    })
});



    

    
  

 