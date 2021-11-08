const fs = require('fs');
const path = require('path');

const pathStyles = path.resolve('05-merge-styles', 'styles')
const bundlePath = path.resolve('05-merge-styles', 'project-dist', 'bundle.css')
fs.readdir(pathStyles,{withFileTypes:true},(err,files)=>{
    if(err) console.log(err)
    else{
        
    files.forEach((file)=>{
        
        const pathText = path.resolve(pathStyles, file.name)
        const fileExtract =  returnExtract(file, pathText).slice(1)
        if (fileExtract=="css"){
        const stream = fs.createReadStream(pathText, 'utf-8');
        let text="";
        stream.on('data', partData => text += partData);
        stream.on('error', error => console.log('Error', error.message))
        stream.on('end', ()=> {
            
            fs.open (bundlePath, 'w', (err) => {if (err) throw err} )
            fs.appendFile(bundlePath, text.trim(), function(){})
            
        })
    }
    
    })
    
}
})
function returnExtract(file, pathText){
    return path.extname(path.resolve(pathText,file.name))
}