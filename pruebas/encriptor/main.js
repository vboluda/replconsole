var encriptor=require("./encriptor");

var pass="EstoEsUnaPrueba";
var pass2="12345678901234567890123456789013";

var enc=encriptor.encrypt("hola mundo!",pass);

var dec=encriptor.decrypt(enc,pass);

console.log(enc);
console.log(dec);