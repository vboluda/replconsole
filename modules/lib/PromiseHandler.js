"use strict";

class newPromise{
    constructor(_promise){
        this.promise=_promise;
    }

    print=function(){
        this.promise.then((v)=>{
            console.log(JSON.stringify(v))
        },
        (e)=>{
            console.error(e);
        })
    }

    store=function(x){
        this.promise.then((v)=>{
            Object.assign(x, v);
        },
        (e)=>{
            console.error(e);
        })
    }

    then=function(resolve,reject){
        this.promise.then(resolve,reject);
    }
}

var handler = {
    get: function(target, name){
        if(!(name in target)){
            console.log("Wrong Property!!");
            return {}
        };
        var property=target[name];
        if(typeof property === 'function'){
            return function(){
                //console.log("CALL "+name);
                var result= property(...arguments);
                if(result instanceof Promise){
                    return new newPromise(result);
                }
                return result;
            }
        }
        if(typeof property === 'object'){
            return new Proxy(property, handler); 
        };
        return property;
    },
};

module.exports=handler;