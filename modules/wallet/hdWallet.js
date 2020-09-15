"use strict";

const { generateMnemonic,EthHdWallet } = require('eth-hd-wallet')
const fs = require('fs');
var encriptor=require("../../encryptor/encryptor");

class bHDWallet{

    constructor(walletFile="WALLET.SEC",elem=10){
        this.walletFile=walletFile;
        this.generateAddress=elem;
    }

    unlockWallet(password){
        try{
            //fs.writeFileSync("hola.txt","Hola tios");
            let encMnemonic=""+fs.readFileSync(this.walletFile);
            this.mnemonic=encriptor.decrypt(encMnemonic,password);
            //console.log(`Mnemonic [${this.mnemonic}]`);
            //'box fork try primary close loop shield kite legal produce fitness grab';
            this.wallet=null;
            this.wallet=EthHdWallet.fromMnemonic(this.mnemonic);
            this.address=this.wallet.generateAddresses(this.generateAddress);
        }catch(e){
            console.log(e);
            process.exit(1);
        }
    }

    existsWallet(){
        try {
            return fs.existsSync(this.walletFile);
          } catch(err) {
            console.error(err)
          }
    }

    signTransaction(tx){
        return this.wallet.signTransaction(tx);
    }

    generateMnemonic(){
        return generateMnemonic();
    }

    encryptMnemonic(mnemonic,password){
        var enc=encriptor.encrypt(mnemonic,password);
        var dec=encriptor.decrypt(enc,password);
    
        if(dec!=mnemonic){
            console.log("ERROR: Ilegal State Error - decripted menmonic differs from initial mnemonic!!!!!!!!!");
            process.exit();
        }
        fs.writeFileSync(this.walletFile, enc); 
    }
}

module.exports=new bHDWallet();