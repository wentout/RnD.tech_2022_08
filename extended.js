'use strict';

const BasePrototype = require('typeomatica');
const { BaseClass } = BasePrototype;
const { mySpecialField, myExtendedField } = require('./code/fields');

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

class ExtendedClass extends BasePrototype(secondInstance) {
	constructor() {
		super();
		// words order reverted
		this.myField = myExtendedField;
	}
}

const thirdInstance = new ExtendedClass();
console.log('\n\t\t\t\t↓↓↓\n');
console.log('\tthirdInstance  : ', thirdInstance.myField);  // 'value initial'

// console.log('\n\t\t\t↓↓↓');
console.log('\n\t________________________________________');
console.log('\n \t      →   re-assignment made  ←');
console.log('\t________________________________________\n\n');
// console.log('\t\t\t↑↑↑ \n');

firstInstance.myField = 're-assigned value';

console.log('\tfirstInstance  : ', firstInstance.myField);  // 're-assigned value'
console.log('\tsecondInstance : ', secondInstance.myField); // 're-assigned value'

console.log('\n\t\t\t\t↓↓↓\n');
console.log('\tthirdInstance  : ', thirdInstance.myField);  // 'value re-assigned'
console.log('\n\n');


debugger;
