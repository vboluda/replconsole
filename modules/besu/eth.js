var BConnection=require("./connection");

class beth{
    constructor(url){
        this.connection=new BConnection(url);
    }

    blockNumber(){
        let res = this.connection.request("eth_blockNumber",[]);
        let block = parseInt(res.result);
        return block;
    }
    
}

module.exports=beth;