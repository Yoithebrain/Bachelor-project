const assert = require('chai').assert;
//const sayHello = require('./kratos').sayHello;
//const addNumbers = require('./kratos').addNumbers;
const kratos = require('./kratos');

//Results
sayHelloResult = kratos.sayHello();
addNumbersResult = kratos.addNumbers(5,5);

//Assertion is a comparison which throws an exception upon failure
describe('Kratos', () => {
    describe('sayHello', () => {
        it('sayHello should return hello', () => {
            //let result = kratos.sayHello();
            assert.equal(sayHelloResult, 'hello');
        });
    
        it('sayHello should return type string', () => {
           // let result = kratos.sayHello();
            assert.typeOf(sayHelloResult, 'string');
        });
    })
    describe('addNumbers', () => {
        it('addNumbers should be above 5', () => {
            // let result = kratos.addNumbers(5,5);
             assert.isAbove(addNumbersResult, 5);
         });
     
         it('addNumbers should return type number', () => {
            // let result = kratos.addNumbers(5,5);
             assert.typeOf(addNumbersResult, 'number');
         });
    })

});