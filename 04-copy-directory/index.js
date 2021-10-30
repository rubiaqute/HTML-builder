const fs = require('fs');
const path = require('path');
const pathText = path.resolve('04-copy-directory', 'files')
const newPath = path.resolve('04-copy-directory','files-copy')
fs.promises.mkdir(newPath, {recursive: true})

fs.readdir(pathText,{withFileTypes:true},(err,files)=>{
    if(err) console.log(err)
    else{
    files.forEach((file)=>{
    fs.promises.copyFile(path.resolve(pathText, file.name), path.resolve(newPath,file.name))
    
    })
}
})