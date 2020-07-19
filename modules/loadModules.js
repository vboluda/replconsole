"use strict";

const Web3 = require('web3')

const Handler=require("./lib/PromiseHandler");
const ContractAdaptor=require("./lib/ContractAdaptor");
const Misc=require("./utils/misc");

const Wallet=require("./wallet/hdWallet");
const BConnection=require("./besu/connection");
const besu_admin=require("./besu/admin");
const besu_eth=require("./besu/eth");
const besu_txpool=require("./besu/txpool");
const besu_test=require("./besu/test");

const txpermission_config=require("../config/ContractTxPremissionConfig");

var besu_connection0=new BConnection("http://192.168.1.3:8545");
//var besu_connection0=new BConnection("http://127.0.0.1:5678");
var besu_connectionWS0="ws://192.168.1.3:8546";
//var besu_connectionWS0="ws://127.0.0.1:5679";
var besu_web3_0=new Web3(besu_connectionWS0);


const state={
    misc: new Misc(),
    wallet:Wallet,
    besu0:{
            connection: besu_connection0,
            admin:new besu_admin(besu_connection0),
            eth:new besu_eth(besu_connection0,Wallet),
            txpool:new besu_txpool(besu_connection0),
            web3:new Proxy(besu_web3_0,Handler),
            contracts:{
                txpermission:new ContractAdaptor(Wallet,besu_web3_0,txpermission_config.abi,txpermission_config.address,txpermission_config.opts)
            }
         }
    
}

state.besu0.test=new besu_test(state.besu0.eth,state.besu0.txpool);

module.exports=state;