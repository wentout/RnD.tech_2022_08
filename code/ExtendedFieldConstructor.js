'use strict';

const { FieldConstructor } = require('typeomatica');

const util = require('util');
const hasNodeInspect = (util && util.inspect && util.inspect.custom);

class MyString extends String {
	static get [Symbol.species]() { return String; }

	constructor(value) {
		super(value);
		return new Proxy(this, {
			get(_, prop) {

				if (prop === Symbol.toStringTag) {
					return 'MyString';
				}

				if (prop === Symbol.iterator) {
					// const str = value;
					// const iterator = str[Symbol.iterator]();
					// return iterator;
					return undefined;
				}

				if (prop === util.inspect.custom) {
					return value;
				}

				if (prop === Symbol.toPrimitive) {
					return function () {
						return value;
					}
				}

				// if (prop === 'valueOf') {
				// 	return function () {
				// 		return value;
				// 	}
				// }

				if (typeof String[prop] === 'function') {
					return function (...args) {
						return String.prototype[prop].apply(value, args);
					}
				}

				return value;

				// throw new Error(prop);
			}
		});
	}
}

class ExtendedFieldConstructor extends FieldConstructor {


	get = function (...args) {
		const self = Object.getPrototypeOf(this);
		const value = self.myField;
		const preparedValue = value.split(' ').reverse().join(' ');

		/*

		// tried this ... unforgivable
		const objectedValue = new MyString(preparedValue);
		const proxyAsValue = new Proxy(objectedValue, {
			get(_, prop) {

				if (prop === util.inspect.custom) {
					return value;
				}

				if (prop === Symbol.toPrimitive) {
					return function () {
						return value;
					}
				}

				if (typeof String[prop] === 'function') {
					return function (...args) {
						return String.prototype[prop].apply(value, args);
					}
				}

				// this will never be reached, actually
				throw new Error(prop);
			}
		});
		return proxyAsValue;

		/*
		
		// if we will go with just String, then ...
		const objectedValue = new String(preparedValue);
		
		if (hasNodeInspect) {
			objectedValue[util.inspect.custom] = function () {
				return preparedValue;
			}
		}
		
		objectedValue[Symbol.toPrimitive] = function () {
			return preparedValue;
		}
		
		objectedValue.valueOf = function () {
			return preparedValue;
		}
		
		*/
		
		// though we will use the following
		const objectedValue = new MyString(preparedValue);
		if (hasNodeInspect) {
			objectedValue[util.inspect.custom] = function () {
				return preparedValue;
			}
		}
		return objectedValue;
	}

	constructor() {
		super();
		Reflect.defineProperty(this, 'enumerable', {
			value: true
		});

		// boring... let make something new

		// Reflect.defineProperty(this, 'get', {
		// 	get() {
		// 		return function (...args) {
		// 			const self = Object.getPrototypeOf(this);
		// 			const value = self.myField;
		// 			return value.split(' ').reverse().join(' ');
		// 		}
		// 	},
		// 	enumerable: true
		// });
	}
}

Object.assign(module.exports, { ExtendedFieldConstructor });