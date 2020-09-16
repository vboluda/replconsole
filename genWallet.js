"use strict";

const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet')
//let Prompt = require('./encryptor/PromptPassword');
var encriptor=require("./encryptor/encryptor");
//const { prototype } = require('./encryptor/PromptPassword');


(async ()=>{
    if(process.argv.length>3){
        console.log("Usage node genWallet");
        console.log("Usage node genWallet '<mnemonic>'");
    }
    
    var mnemonic=generateMnemonic();
    if(process.argv.length==3){
        mnemonic=process.argv[2];
    }
    
    //var prompt=new Prompt(true);
    console.info("Provide encryption password: ")
    var password="12345";

    var enc=encriptor.encrypt(mnemonic,password);
    var dec=encriptor.decrypt(enc,password);

    if(dec!=mnemonic){
        console.log("ERROR: Ilegal State Error - decripted menmonic differs from initial mnemonic!!!!!!!!!");
        process.exit();
    }

    console.info("PLAIN MNEMONIC (KEEP IT SAFE!)");
    console.info("------------------------------");
    console.info(dec);
    console.info("");
    console.info("ENCRYPTED MNEMONIC (DO NOT FORGET PROVIDED PASSWORD");
    console.info("---------------------------------------------------");
    console.info(enc);
    
  
    
    
})();
