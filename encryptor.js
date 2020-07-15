"use strict";
const readline = require('readline');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
const IV_LENGTH=16;
    
async function askQuestion(query,muted=false) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.stdoutMuted=muted;
    rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.stdoutMuted)
          rl.output.write("*");
        else
          rl.output.write(stringToWrite);
    };
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

// (async function(){
//     //const mnemonic = await askQuestion("Introduce Mnemonic: ");
//     //console.info("Password");
//     //var password = await askQuestion("",true);

//     var mnemonic="dsfsdakfaslñdfksladñfkaslñdfksdlñfkslñdkf";
//     password="12345678901234567890123456789012";
//     console.log(`Mnemonic [${mnemonic}] Password: ********`);
//     let iv = crypto.randomBytes(IV_LENGTH);
//     console.log("Random: ["+iv+"]");
//     let cipher = crypto.createCipheriv(algorithm, Buffer.from(password, 'hex'), iv);
//     let encrypted = cipher.update(mnemonic);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     console.info(`Encrypted text [${crypted}]`)
// });


var mnemonic="dsfsdakfaslñdfksladñfkaslñdfksdlñfkslñdkf";
var password="123456789012345678901234567890122";
console.log(`Mnemonic [${mnemonic}] Password: ********`);
let iv = crypto.randomBytes(IV_LENGTH);
console.log("Random: ["+iv+"]");
let cipher = crypto.createCipheriv(algorithm, Buffer.from(password, 'hex'), iv);
let encrypted = cipher.update(mnemonic);
encrypted = Buffer.concat([encrypted, cipher.final()]);
console.info(`Encrypted text [${crypted}]`)