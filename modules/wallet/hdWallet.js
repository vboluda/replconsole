"use strict";

const { generateMnemonic,EthHdWallet } = require('eth-hd-wallet')
const fs = require('fs');
var encriptor=require("../../encryptor/encryptor");

class bHDWallet{

    constructor(walletFile="WALLET.SEC",elem=10){
        var password=global._password_;
        global._password_= null;
        try{
            //fs.writeFileSync("hola.txt","Hola tios");
            let encMnemonic=""+fs.readFileSync(walletFile);
            this.mnemonic=encriptor.decrypt(encMnemonic,password);
            //console.log(`Mnemonic [${this.mnemonic}]`);
            //'box fork try primary close loop shield kite legal produce fitness grab';
            this.wallet=null;
            this.wallet=EthHdWallet.fromMnemonic(this.mnemonic);
            this.address=this.wallet.generateAddresses(elem);
        }catch(e){
            console.log(e);
            process.exit(1);
        }
    }

    signTransaction(tx){
        return this.wallet.signTransaction(tx);
    }

    createWallet(elem=10){
       
    }

    unlockWallet(passw="#"){
        
    }
}

module.exports=new bHDWallet();