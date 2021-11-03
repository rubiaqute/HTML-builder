const fs = require('fs');
const path = require('path');

const pathText = path.resolve('03-files-in-folder', 'secret-folder')

fs.readdir(pathText,{withFileTypes:true},(err,files)=>{
    if(err) console.log(err)
    else{
        
        files.forEach((file)=> {
            if (!file.isDirectory()==true){
                
                    const fileExtract =  returnExtract(file).slice(1)
                    const fileName =   returnBasename(file)
                    fs.stat(path.resolve(pathText, file.name),  (error,stats)=>{
                        const sizeF = stats.size
                        
                        console.log (fileName +" - "+fileExtract + " - " +sizeF +"b")
                        
                     })
        }
        })
    
    }
})

function returnExtract(file){
    return path.extname(path.resolve(pathText,file.name))
}
function returnBasename(file){
    return path.basename(path.resolve(pathText,file.name), returnExtract(file))
}

