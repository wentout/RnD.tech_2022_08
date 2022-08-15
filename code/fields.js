'use strict';

const { MyFieldConstructor } = require('./MyFieldConstructor');
const { ExtendedFieldConstructor } = require('./ExtendedFieldConstructor');

const mySpecialField = new MyFieldConstructor('initial value');
const myExtendedField = new ExtendedFieldConstructor();

Object.assign(module.exports, {
	mySpecialField,
	myExtendedField
});
