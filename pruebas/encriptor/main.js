var encriptor=require("./encriptor");

var pass="EstoEsUnaPrueba";



var enc=encriptor.encrypt("hola mundo!",pass);

var dec=encriptor.decrypt(enc,pass);

console.log(enc);
console.log(dec);