"use strict";


(async ()=> {
    console.info("");
    console.info("ETHEREUM MANAGEMENT CONSOLE (v0.5)");
    console.info("----------------------------------");
    console.info("(c) Vicente Boluda Vias 2020");
    console.info("");
    console.info("Platform: "+process.platform);
    console.info("Nodejs: "+process.version);
    console.info("");


    var argv = require('minimist')(process.argv.slice(2));
    console.log(argv);

    if(process.argv[2]==="generateWallet"){
        (async ()=>{
            console.info("YOU ARE GOING TO DELETE CURRENT WALLET (IF EXISTS) AND REGENERATE NEW ONE");
            console.info("DO NOT DO IT UNLESS YOU ARE AWARE OF ITS IMPLICATIONS!!!!!!!!!!!!!!!!!!!!");
            console.info("(TO KEEP SAFE, PRESS ^C )")
            var wallet=require("./modules/wallet/hdWallet");
            await wallet.generateWallet();
            process.exit();
        })();
    }


    // var configFile="../config.json";
    // if(process.argv==3){
    //     configFile=process.argv[2];
    // }

    // const fs = require('fs');
    // let rawdata = fs.readFileSync(configFile);
    // let config = JSON.parse(rawdata);
    const promptly=require("promptly");
    const password = await promptly.password('Provide password to unlock Wallet: ', { replace: '*' });
    global._password_=password;

    const repl = require('repl');
    const state=require("./modules/loadModules");


    const myRepl = repl.start("ETH $ ");

    state.exit=function(){
        process.exit();
    }

    Object.assign(myRepl.context, state);
})();
