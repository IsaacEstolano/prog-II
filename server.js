const express = require('express');
const app = express();

app.use("/public",express.static(__dirname + "/public"))

app.get("/api/:date?",(req,res)=>{
    let dateParam = req.params.date;
    let date;
    let timezone = req.query.tz || "UTC"
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
    


    const res= {
        unix:date.getTime(),
        utc:date.toUTCString(),
        timezone:date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    }

    res.json(response)
})

app.use("/public",express.static(__dirname + "/public"))
const absolutePath = __dirname + "/public/index.html"
app.get("/",(req,res) =>{
    res.sendFile(absolutePath)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Servidor esta rodando na porta 3000")
});