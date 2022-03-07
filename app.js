const express = require("express");
app = express();
jwt = require('jsonwebtoken');
const fs =  require('fs');

let private = fs.readFileSync('./private.cer', 'utf8');
let public = fs.readFileSync('./public.cer', 'utf8');

var payload = { };
payload.name = "Abinash";

var iss = "abinash";
var sub = "abinash.boruah92@gmail.com";
var aud = "www.facebook.com";
var exp = "24h";

app.post("/",(req,res)=>{
    var signOptions = {
        issuer : iss,
        subject: sub,
        audience: aud,
        expiresIn: exp,
        algorithm: "RS256"
    };
    
    var token = jwt.sign(payload, private, signOptions);
    
    console.log("\n Token: " + token);
})


//verify

app.post("/verify",(req,res)=>{
    var verifyOptions = { 
        issuer : iss,
        subject: sub,
        audience: aud,
        expiresIn: exp,
        algorithms: ["RS256"]
    };
    var verified = jwt.verify(token, public, verifyOptions);
    console.log("\n Verified: " + JSON.stringify(verified));
})



app.listen(4080, ()=>{
    console.log("\n server at 4080");
});