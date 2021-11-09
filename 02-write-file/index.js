const fs = require('fs');
const path = require('path');


const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const pathText = path.resolve('02-write-file', 'secret.txt')


const rl = readline.createInterface({ input, output });

rl.question('My darling, tell me your secret? ', (answer) => {
    if (answer.includes('exit'))  closeRl();
    else {
        fs.open (pathText, 'w', (err) => {if (err) throw err} )
        fs.appendFile(pathText, answer +'\n', function(){})
    }
});
rl.on('line', (answer) =>{
    if (answer=='exit')  closeRl();
    else{
        fs.appendFile(pathText, answer +'\n', function(){})
    }
})

rl.on('SIGINT', closeRl) 

function closeRl (){
    console.log('Thank you, everything is recorded. See you later');rl.close();
}
  