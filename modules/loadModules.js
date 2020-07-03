const besu_admin=require("./besu/admin");
const besu_eth=require("./besu/eth");

const state={
    besu1:{
            admin:new besu_admin("http://192.168.1.3:5678"),
            eth:new besu_eth("http://192.168.1.3:5678")
         }
    
}

module.exports=state;