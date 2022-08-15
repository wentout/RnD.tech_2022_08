'use strict';

const { BaseClass } = require('typeomatica');
const { mySpecialField } = require('./code/fields');

class FirstClass extends BaseClass {
	constructor() {
		super();
		this.myField = mySpecialField;
	}
}

class SecondClass extends BaseClass {
	constructor() {
		super();
		this.myField = mySpecialField;
	}
}

const firstInstance = new FirstClass();
const secondInstance = new SecondClass();

console.log('\n');
console.log('\tfirstInstance  : ', firstInstance.myField);  // 'initial value'
console.log('\tsecondInstance : ', secondInstance.myField); // 'initial value'

console.log('\n\t________________________________________');
console.log('\n \t      →   re-assignment made  ←');
console.log('\t________________________________________\n\n');

firstInstance.myField = 're-assigned value';

console.log('\tfirstInstance  : ', firstInstance.myField);  // 're-assigned value'
console.log('\tsecondInstance : ', secondInstance.myField); // 're-assigned value'
console.log('\n');