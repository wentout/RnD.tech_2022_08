'use strict';

const { FieldConstructor } = require('typeomatica');

class MyFieldConstructor extends FieldConstructor {
	constructor(value) {
		super(value);
		const self = this;
		self._value = value;
		Reflect.defineProperty(this, 'enumerable', {
			value: true
		});
		Reflect.defineProperty(this, 'get', {
			get() {
				return function () {
					return self._value;
				}
			},
			enumerable: true
		});
		Reflect.defineProperty(this, 'set', {
			get() {
				return function (value) {
					self._value = value;
				}
			},
			enumerable: true
		});
	}
}

Object.assign(module.exports, { MyFieldConstructor });