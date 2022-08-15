'use strict';

const { FieldConstructor } = require('typeomatica');

class ExtendedFieldConstructor extends FieldConstructor {
	constructor() {
		super();
		Reflect.defineProperty(this, 'enumerable', {
			value: true
		});
		Reflect.defineProperty(this, 'get', {
			get() {
				return function () {
					const self = Object.getPrototypeOf(this);
					return self.myField.split(' ').reverse().join(' ');
				}
			},
			enumerable: true
		});
	}
}

Object.assign(module.exports, { ExtendedFieldConstructor });