const fs = require('fs');
const path = require('path');

const pathText = path.resolve('01-read-file', 'text.txt')
const stream = fs.createReadStream(pathText, 'utf-8');
let text="";
stream.on('data', partData => text += partData);
stream.on('error', error => console.log('Error', error.message))
stream.on('end', ()=> console.log(text.trim()))