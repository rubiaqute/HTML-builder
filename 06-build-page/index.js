const fs = require('fs');
const path = require('path');
const pathProjetcDist = path.resolve('06-build-page', 'project-dist')
const pathOldAssets = path.resolve('06-build-page', 'assets')
const pathNewAssets = path.resolve('06-build-page', 'project-dist', 'assets')
const pathTemplate = path.resolve('06-build-page', 'template.html')
const pathComponents = path.resolve('06-build-page', 'components')
const pathIndex = path.resolve('06-build-page', 'project-dist', 'index.html')



fs.access(pathProjetcDist, function(error){
    if (error) {
        justCreate()
    } else {
         eliminateAndCreate()
    }
})

function justCreate(){
    fs.promises.mkdir(pathProjetcDist)
    fs.promises.mkdir(pathNewAssets)
    copyAssets(pathOldAssets, pathNewAssets)
    bundleStyles();
    createIndexHTML()
}
async function eliminateAndCreate(){
    await fs.promises.rmdir(pathProjetcDist, {recursive:true})
    await fs.promises.mkdir(pathProjetcDist,{recursive:true})
    await fs.promises.mkdir(pathNewAssets,{recursive:true})
    copyAssets(pathOldAssets, pathNewAssets)
    bundleStyles();
    createIndexHTML()
}

function copyAssets(pathOldAssets, pathNewAssets){
    fs.readdir(pathOldAssets,{withFileTypes:true},(err,files)=>{
        if(err) console.log(err)
        else{
            files.forEach((file)=> {
                const srcPath = path.resolve(pathOldAssets,file.name);
                const destPath = path.resolve(pathNewAssets,file.name);
                if (file.isDirectory()==true){
                     fs.promises.mkdir(destPath,{recursive:true})
                     copyAssets(srcPath,destPath)
                } else{
                     fs.promises.copyFile(srcPath,destPath);
                }
            })
        }
    })
}
function bundleStyles(){
    const pathStyles = path.resolve('06-build-page', 'styles')
    const bundlePath = path.resolve('06-build-page', 'project-dist', 'style.css')
    fs.readdir(pathStyles,{withFileTypes:true},(err,files)=>{
        if(err) console.log(err)
        else{
            files.forEach((file)=>{
                const pathFile = path.resolve(pathStyles, file.name)
                const fileExtract =  returnExtract(file, pathFile).slice(1)
                if (fileExtract=="css"){
                    const stream = fs.createReadStream(pathFile, 'utf-8');
                    let stylesFileContent="";
                    stream.on('data', partData => stylesFileContent += partData);
                    stream.on('error', error => console.log('Error', error.message))
                    stream.on('end', ()=> {
                        appendToFile(bundlePath, stylesFileContent)
                    })
                }
            })
        }
    })
}

function createIndexHTML(){
    const stream = fs.createReadStream(pathTemplate, 'utf-8');
    let template="";
    stream.on('data', partData => template += partData);
    stream.on('error', error => console.log('Error', error.message))
    stream.on('end', ()=> {
        getIndexContent(template);
    })
}

function returnBasename(file, pathDirectory){
        return path.basename(path.resolve(pathDirectory,file.name), returnExtract(file,  pathDirectory))
}
function returnExtract(file, pathDirectory){
    return path.extname(path.resolve(pathDirectory,file.name))
}
function getIndexContent(template){
    fs.readdir(pathComponents,{withFileTypes:true},(err,files)=>{
        if(err) console.log(err)
        else{
            replaceTagsByComponents(files, template);
        }
    })
}
function  replaceTagsByComponents(files, indexContent){
    for (const file of files){
        const fileExtract =  returnExtract(file, pathComponents).slice(1)
        if (fileExtract=="html"){
            const stream =  fs.createReadStream(path.resolve(pathComponents,file.name), 'utf-8');
            let component="";
            stream.on('data', partData => component += partData);
            stream.on('error', error => console.log('Error', error.message))
            stream.on('end', ()=> {
                const fileName =  returnBasename(file, pathComponents)
                indexContent =  indexContent.replace(`{{${fileName}}}`, component)
                writeToFile(pathIndex, indexContent);
            })
        }
    }
}
function writeToFile(pathFile, content){
    fs.open (pathFile, 'w', (err) => {if (err) throw err} )
    fs.writeFile(pathFile, content, function(){})
}
function appendToFile(pathFile, content){
    fs.open (pathFile, 'w', (err) => {if (err) throw err} )
    fs.appendFile(pathFile, content, function(){})
}