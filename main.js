const repl = require('repl');
const state=require("./modules/loadModules");

const myRepl = repl.start("Console $ ");

Object.assign(myRepl.context, state);