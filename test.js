"use strict";

require('./index');

console.debug('This is a DEBUG message');
console.info('This is an INFO message');
console.log('This is a LOG message');
console.warn('This is a WARN message');
console.error('This is an ERROR message');
console.dir({message: 'This is an object', method: 'console.dir'});
console.error({message: 'This is also an object', method: 'console.error'});
