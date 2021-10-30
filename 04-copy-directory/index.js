const fs = require('fs');
const path = require('path');
const pathText = path.resolve('04-copy-directory', 'files')
const newPath = path.resolve('04-copy-directory','files-copy')

fs.access(newPath, function(error){
    if (error) {
        fs.promises.mkdir(newPath)
        copyFiles()
        
    } else {
         eliminateAndCopy()
    }
    
})




async function eliminateAndCopy(){
    await fs.promises.rmdir(newPath, {recursive:true})
    await fs.promises.mkdir(newPath,{recursive:true})
    await copyFiles()
    
}
function copyFiles(){
    fs.readdir(pathText,{withFileTypes:true},(err,files)=>{
        if(err) console.log(err)
        else{
        files.forEach((file)=>{
        fs.promises.copyFile(path.resolve(pathText, file.name), path.resolve(newPath,file.name))
        
        })
    }
    })
}