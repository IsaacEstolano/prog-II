const express = require('express');
const app = express();

app.get("/",(req,res)=>
    res.send("lalala")
);

app.get("/api/:date?",(req,res)=>{
    let dateParam = req.params.date;
    let date;

    if(!dateParam){
        date=new Date();
    }
    else if(!isNaN(dateParam)){
        date=new Date(parseInt(dateParam))
        console.log("sasassa")
    }
    else {
        date=new Date(dateParam)
        console.log("dadadad")
    }
    if (isNaN(date.getTime())) { // Verifica se a data é inválida 
        return res.json({ error: "Invalid Date" }); // Caso for, vai dar erro e dizer que a data é inválida
    }
    

    res.json({
        unix:date.getTime(),
        utc:date.toUTCString()
    })
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Servidor esta rodando na porta 3000")
});