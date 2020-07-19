"use strict";

console.info("");
console.info("ETHEREUM MANAGEMENT CONSOLE (v0.5)");
console.info("----------------------------------");
console.info("(c) Vicente Boluda Vias 2020");
console.info("");
console.info("Platform: "+process.platform);
console.info("Nodejs: "+process.version);
console.info("");

// var configFile="../config.json";
// if(process.argv==3){
//     configFile=process.argv[2];
// }

// const fs = require('fs');
// let rawdata = fs.readFileSync(configFile);
// let config = JSON.parse(rawdata);


const repl = require('repl');
const state=require("./modules/loadModules");


const myRepl = repl.start("ETH $ ");

state.exit=function(){
    process.exit();
}

Object.assign(myRepl.context, state);