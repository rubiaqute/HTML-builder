const fs = require('fs');
const path = require('path');
const pathProjetcDist = path.resolve('06-build-page', 'project-dist')
const pathOldAssets = path.resolve('06-build-page', 'assets')
const pathNewAssets = path.resolve('06-build-page', 'project-dist', 'assets')


fs.access(pathProjetcDist, function(error){
    if (error) {
        fs.promises.mkdir(pathProjetcDist)
        fs.promises.mkdir(pathNewAssets)
        copyAssets(pathOldAssets, pathNewAssets)
        
    } else {
         eliminateAndCreate()
    }
    
})
async function eliminateAndCreate(){
    await fs.promises.rmdir(pathProjetcDist, {recursive:true})
    await fs.promises.mkdir(pathProjetcDist,{recursive:true})
    await fs.promises.mkdir(pathNewAssets,{recursive:true})
    await copyAssets(pathOldAssets, pathNewAssets)
}

async function copyAssets(pathOldAssets, pathNewAssets){
    await fs.readdir(pathOldAssets,{withFileTypes:true},(err,files)=>{
        if(err) console.log(err)
        else{
            console.log(files)
            files.forEach((file)=> {
                if (file.isDirectory()==true){
                     fs.promises.mkdir(path.resolve(pathNewAssets,file.name),{recursive:true})
                    copyAssets(path.resolve(pathOldAssets,file.name),path.resolve(pathNewAssets,file.name))
                
                } else{
                const srcPath = path.resolve(pathOldAssets,file.name);
                const destPath = path.resolve(pathNewAssets,file.name);
                fs.promises.copyFile(srcPath,destPath);
                }
    
        })
    
    }
})
}

    
    
