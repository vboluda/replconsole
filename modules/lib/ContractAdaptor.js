"use strict";

const newPromise=require("./newPromise");

class ContractAdaptor{
    constructor(_web3,_abi,_address,_opts={}){
        this.address=_address;
        this._abi=_abi;
        this.instance=new _web3.eth.Contract(_abi,_address,_opts);
        this.instance.options.from=_opts.from;
        //this.instance.options.gas=_opts.from || 1000000;
        //this.instance.options.gasPrice=_opts.from || '20000000000000';
        this.opts=_opts;
        
        this.methods={};
        for(let k in this._abi){
            let v=this._abi[k];
            if(v.type!="function") continue;
            var name=v.name;
            var def={};
            if((v.stateMutability==="view") || (v.stateMutability==="pure")){
                def.type="read";
                var _this=this;
                this.methods[name]=function(){
                    let e = (new Error().stack.split("at ")[1]).trim();
                    //console.log(e);
                    let _function1=e.split("[as ")[1];
                    let _function2=_function1.split("]")[0];
                    console.log(`CALL ${_function2}(${arguments})`);
                    var result=_this.instance.methods[_function2](...arguments).call();
                    if(result instanceof Promise){
                        return new newPromise(result);
                    }
                }
            }else{
                def.type="write";
                var _this=this;
                this.methods[name]=function(){
                    let e = (new Error().stack.split("at ")[1]).trim();
                    //console.log(e);
                    let _function1=e.split("[as ")[1];
                    let _function2=_function1.split("]")[0];
                    //console.log(`CALL ${_function2}(${JSON.stringify(arguments)}) opts: ${JSON.stringify(this.opts)}`);
                    var result=_this.instance.methods[_function2](...arguments).send();
                    if(result instanceof Promise){
                        return new newPromise(result);
                    }
                }
            }

        }
      
    }



}


module.exports=ContractAdaptor;