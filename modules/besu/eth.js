"use strict";

class beth{
    constructor(conn){
        this.connection=conn;
    }

    blockNumber(){
        let res = this.connection.request("eth_blockNumber",[]);
        let block = parseInt(res.result);
        return block;
    }

    sendRawTransaction(tx){
        if(!Array.isArray(tx)){
            tx=[tx];
        }
        return this.connection.request("eth_sendRawTransaction",tx).result;
    }

    getBalance(address){
        if(!Array.isArray(address)){
            address=[address,'latest'];
        }
        return parseInt(this.connection.request("eth_getBalance",address).result);
    }

    getTransctionByHash(tx){
        if(!Array.isArray(tx)){
            tx=[tx];
        }
        return this.connection.request("eth_getTransactionByHash",tx).result;
    }
    
}

module.exports=beth;