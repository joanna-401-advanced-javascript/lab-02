'use strict';

class Validator {

  constructor(schema) {
    this.schema = schema;
  }

  isString(input) {
    return typeof input === 'string';
  }

  isObject(input) {
    return typeof input === 'object';
  }

  isArray(input, valueType) {
    return Array.isArray(input);
  }

  isBoolean(input) {
    return typeof input === 'boolean';
  }

  isNumber(input) {
    return typeof input === 'number';
  }

  isFunction(input) {
    return typeof input === 'function';
  }

  isTruthy(input) {
    return input === true
  }

  isValid(data) {
    let validity = true;
    if (typeof(data) !== 'object'){
      validity = false;
    }
    Object.keys(data).forEach(property => {
      if (typeof (data[property]) !== this.schema.fields[property].type) {
        validity = false;
      }
    });
    return validity;
  }
}

module.exports = Validator;
