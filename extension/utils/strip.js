const stripDebug = require('strip-debug');
const argv = require('yargs').argv
const fs = require('fs');
const path = require('path');

function fromDir(startPath,filter){

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);

            let data = fs.readFileSync(filename).toString();

            fs.writeFileSync(filename, stripDebug(data).toString(), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
            console.log("The file "+filename +" was stripped!");
        };
    };
};

const args = argv._;
if(args&&args.length>1){
  const dir = args.shift();
  const filters = [...args];
  console.log(dir+'  '+filters);
  filters.forEach(
    (file)=>{
      fromDir(dir,file);
    }
  )
}else console.log("Usage: node strip.js 'directory' 'filter name 1' 'filter name 2' '...'");
