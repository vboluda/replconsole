"use strict";

const { EthHdWallet } = require('eth-hd-wallet')

//TODO Securize
const mnemonic = 'box fork try primary close loop shield kite legal produce fitness grab';

class bHDWallet{

    constructor(mnemonic,elem=10){
        this.wallet=EthHdWallet.fromMnemonic(mnemonic);
        this.address=this.wallet.generateAddresses(elem);
    }

    signTransaction(tx){
        return this.wallet.signTransaction(tx);
    }
}

module.exports=new bHDWallet(mnemonic);