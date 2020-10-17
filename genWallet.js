"use strict";

const fs=require('fs');
const promptly=require("promptly");
const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet')
var encriptor=require("./encryptor/encryptor");
var wallet=require("./modules/wallet/hdWallet");


(async ()=>{
    var args = require('minimist')(process.argv.slice(2));
    console.log(args);

  
    var arg_help=args.help;
    var arg_genwallet=args.genwallet || false;
    var arg_walletfile=args.walletfile || 'WALLET.dat';
    var arg_mnemonic=args.import || "#";

    console.info("*****************************************");
    console.info(" GEN WALLET")
    console.info("*****************************************");
    if(arg_help){
        console.log("genwallet [args]");
        console.log("--genwallet \t\t To generate new wallet from scratch");
        console.log("--walletfile [file] \t Output  wallet file");
        console.log("--import [mnemonic] \t Mnemonic words to recover wallet");
        console.log("--help \t\t\t Shows this text");
        process.exit(0);
    }


    if(fs.existsSync(arg_walletfile)){
        console.info("ERROR: File exists. Please provide new file name");
        process.exit(1);
    }
    if((arg_mnemonic=="#") && !arg_genwallet){
        console.info("ERROR: Import option requires mnemonic");
        process.exit(1);
    }
    if((arg_mnemonic!="#") &&(arg_genwallet)){
        console.info("ERROR: incompatible configuration");
        console.info("Cannot use genwallet with import");
        process.exit(1);
    }
  
    
    console.info(`Wallet File: ${arg_walletfile}`);
    var mnemonic="";
    if(arg_genwallet){
        console.info(`Generate new wallet`);
        mnemonic=generateMnemonic();
    }else{
        mnemonic=arg_mnemonic;
    }
        
    console.info("Provide encryption password: ");
    var password="";
    while(true){
        password = await promptly.password('Type password to lock Wallet: ', { replace: '*' });
        let password2 = await promptly.password('Retype password to lock Wallet: ', { replace: '*' });
        if(password!=password2){
            console.info("Passwords do not match. Please try again.");
        }else{
            break;
        }
    }
    

    var enc=encriptor.encrypt(mnemonic,password);
    var dec=encriptor.decrypt(enc,password);

    if(dec!=mnemonic){
        console.log("ERROR: Ilegal State Error - decripted menmonic differs from initial mnemonic!!!!!!!!!");
        process.exit(1);
    }

    console.info("PLAIN MNEMONIC (KEEP IT SAFE!)");
    console.info("------------------------------");
    console.info(dec);
    console.info("");
    console.info("ENCRYPTED MNEMONIC (DO NOT FORGET PROVIDED PASSWORD)");
    console.info("----------------------------------------------------");
    console.info(enc);
    fs.writeFileSync(arg_walletfile,enc);

    wallet.walletFile=arg_walletfile;
    wallet.unlockWallet(password);
    console.info("Adresses: ");
    wallet.address.forEach((e,i,o) => {
        console.info(`[${i}]: "${e}"`);
    });
})();
