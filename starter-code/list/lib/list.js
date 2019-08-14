'use strict';

class List {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  /***
   * This method allows you to reset the index numbers for a list
   */
  reindex() {
    let data = Object.keys(this.data).sort().reduce((acc,val,idx) => {
      acc[idx] = this.data[val];
      return acc;
    },{});

    this.length = Object.keys(data).length;
    this.data = data;
  }

  /***
   * This method allows you to add a new element at the end of the list
   * @param item - The new item to be added to the end of the list
   * @returns {number} - The new length of the list
   */
  push(item) {
    if ( arguments.length === 1 ) {
      this.data[this.length++] = item;
    }
    return this.length;
  }

  /***
   * This method allows you to remove the last element of the list
   * @returns {undefined|*} - The item that was removed
   */
  pop() {
    if ( ! this.length ) { return undefined; }
    let item = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return item;
  }

  /***
   * This method allows you to remove the first element of the list
   * @returns {undefined|*} - The item that was removed
   */
  shift() {
    if ( ! this.data[0] ) { return undefined; }
    let item = this.data[0];
    delete this.data[0];
    this.reindex();
    return item;
  }

  /***
   * This method allows you to add an element to the beginning of the list
   * @param item - The new item to be added to the beginning of the list
   * @returns {number} - The new length of the list
   */
  unshift(item) {
    this.data[-1] = item;
    this.reindex();
    return this.length;
  }

  /***
   * This method allows you to perform a callback function on each item of a list
   * @param callback - The function that is performed on each item of the list
   */
  forEach(callback) {
    if ( this.length ) {
      for (let i = 0; i <= this.length - 1; i++) {
        callback(this[i], i);
      }
    }
  }

  /***
   * This method allows you to perform a callback function on each element of the list and puts the results in a new list
   * @param callback - The function to be performed
   * @returns {undefined|List} - The new list that is generated
   */
  map(callback) {
    if ( ! this.length ) { return undefined; }
    let result = new List();
    for (let i = 0; i <= this.length - 1; i++) {
      result.push(callback(this.data[i], i));
    }
    return result;
  }

  /***
   * This method allows you to perform a callback function on every list item, and returns a new list with only the list items that passed the callback function
   * @param callback - The function to be performed
   * @returns {undefined|List} - The new list that is generated containing only the filtered list items
   */
  filter(callback) {
    if ( ! this.length ) { return undefined; }
    let result = new List();
    for (let i = 0; i <= this.length - 1; i++) {
      if (callback(this.data[i])) {
        result.push(this.data[i]);
      }
    }
    return result;
  }

  /***
   * This method allows you to perform the callback function on every list item, and results in a single value
   * @param callback - The function to be performed
   * @param state - The value that is changed every time the callback function is performed
   * @returns {undefined|*} - The output from state
   */
  reduce(callback, state) {
    if ( ! this.length ) { return undefined; }
    for (let i = 0; i <= this.length - 1; i++) {
      state = callback(state,this.data[i], i);
    }
    return state;
  }

}

module.exports = List;
