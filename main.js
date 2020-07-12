const repl = require('repl');
const state=require("./modules/loadModules");
console.info("");
console.info("ETHEREUM MANAGEMENT CONSOLE (v0.5)");
console.info("----------------------------------");
console.info("(c) Vicente Boluda Vias 2020");
console.info("");
console.info("Platform: "+process.platform);
console.info("Nodejs: "+process.version);
console.info("");

const myRepl = repl.start("Console $ ");

state.exit=function(){
    process.exit();
}

Object.assign(myRepl.context, state);