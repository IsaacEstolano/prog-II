const express = require('express');
const app = express();

app.get("/",(req,res)=>
    res.send("lalala")
);


app.listen(3000,()=>
    console.log("Servidor esta rodando na piorta 3000")
);