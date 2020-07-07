"use strict";

const Web3 = require('web3');

const ContractAdaptor=require("../modules/lib/ContractAdaptor");
const txpermission_config=require("../config/ContractTxPremissionConfig");

var besu_connectionWS0="ws://192.168.1.3:5679";
var besu_web3_0=new Web3(besu_connectionWS0);


var c=new ContractAdaptor(besu_web3_0,txpermission_config.abi,txpermission_config.address,txpermission_config.opts);
//var c=new ContractAdaptor(besu_web3_0,txpermission_config.abi,txpermission_config.address,txpermission_config.opts);

//c.methods.allow("0xffeb26aa528e5ff54cbc5375fc027f1b137a08e5");
var o=c.methods.owner()
console.log(JSON.stringify(o));