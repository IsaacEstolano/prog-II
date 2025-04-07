const express = require('express');
const app = express();

app.get("/",(req,res)=>
    res.send("lalala")
);

app.get("/api/:date?",(req,res)=>{
    let dateParam = req.params.date;
    let date;
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Servidor esta rodando na piorta 3000")
});