'use strict';

const Validator = require('../validator');

describe('#Validator', () => {
    const schema = {
        fields: {
            firstName: {type: 'string'},
            lastName: {type: 'string'},
            hair: {type: 'object'},
            favoriteFoods: {type: 'object'},
            married: {type: 'boolean'},
            kids: {type: 'number'}
        }
    }

    const data = {
        "firstName": "Fred",
        "lastName": "Sample",
        "hair": {
            "type": "wavy",
            "color": "brown"
        },
        "favoriteFoods": ["pizza","cupcakes","salmon"],
        "married": true,
        "kids": 3
    }

    const count = () => {
        let counter = 1;
    }

    const valInstance = new Validator(schema);

    test('string type validation', () => {
        expect(valInstance.isString(data.firstName)).toEqual(true);
        expect(valInstance.isString(data.kids)).toEqual(false);
    });

    test('object type validation', () => {
        expect(valInstance.isObject(data.hair)).toEqual(true);
        expect(valInstance.isObject(data.kids)).toEqual(false);
    });

    test('array type validation', () => {
        expect(valInstance.isArray(data.favoriteFoods)).toEqual(true);
        expect(valInstance.isArray(data.hair)).toEqual(false);
    });

    test('boolean type validation', () => {
        expect(valInstance.isBoolean(data.married)).toEqual(true);
        expect(valInstance.isBoolean(data.kids)).toEqual(false);
    });

    test('number type validation', () => {
        expect(valInstance.isNumber(data.kids)).toEqual(true);
        expect(valInstance.isNumber(data.married)).toEqual(false);
    });

    test('function type validation', () => {
        expect(valInstance.isFunction(count)).toEqual(true);
        expect(valInstance.isFunction(data.hair)).toEqual(false);
    });

    test('truthy type validation', () => {
        expect(valInstance.isTruthy(data.married)).toEqual(true);
        expect(valInstance.isTruthy(0)).toEqual(false);
    });

    test('object validity checked against schema', () => {
        expect(valInstance.isValid(data)).toEqual(true);
        expect(valInstance.isValid(123)).toEqual(false);
    });
});

