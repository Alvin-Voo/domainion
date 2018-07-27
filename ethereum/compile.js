const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractsPath = path.resolve(__dirname,'contracts');

let input = {};

// fs.readdirSync(contractsPath).forEach(file => {
//   input[file]=fs.readFileSync(path.join(contractsPath,file),'utf8')
// })

input = {
  "ownable.sol":fs.readFileSync(path.join(contractsPath,"ownable.sol"),'utf8'),
  "domainion.sol":fs.readFileSync(path.join(contractsPath,"domainion.sol"),'utf8'),
  "admin.sol":fs.readFileSync(path.join(contractsPath,"admin.sol"),'utf8'),
  "players.sol":fs.readFileSync(path.join(contractsPath,"players.sol"),'utf8'),
  "gameplay.sol":fs.readFileSync(path.join(contractsPath,"gameplay.sol"),'utf8')
}

const output = solc.compile({sources : input},1).contracts;

fs.ensureDirSync(buildPath);

if(output){
  for(let contract in output){
    fs.outputJsonSync(
      path.resolve(buildPath, contract.split(':')[1]+'.json'),
      output[contract]
    )
  }
}
