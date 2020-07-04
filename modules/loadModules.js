"use strict";

const Wallet=require("./wallet/hdWallet");
const BConnection=require("./besu/connection");
const besu_admin=require("./besu/admin");
const besu_eth=require("./besu/eth");

var besu_connection0=new BConnection("http://192.168.1.3:5678");

const state={
    wallet:Wallet,
    besu0:{
            connection: besu_connection0,
            admin:new besu_admin(besu_connection0),
            eth:new besu_eth(besu_connection0)
         }
    
}

module.exports=state;