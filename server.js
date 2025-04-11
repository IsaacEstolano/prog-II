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
    
    const response= {
        unix:date.getTime(),
        utc:date.toUTCString(),
        timezone:date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    }

    res.json(response)
})

app.get('/api/diff/:date1/:date2', (req, res) => { // Define a rota (novamente, caminho, endpoint, tudo nome estranho para dizer o local do arquivo) para calcular a diferença entre duas datas
    const parseDate = (param) => { // Função para converter o parâmetro em um objeto Date (o parametro vira a data)
        const num = parseInt(param);    // Tenta converter o parametro para um numero (ou seja, se for timestamp vira numero, e se for string, vira NaN (Not a Number n é um número))
        return isNaN(num) ? new Date(param) : new Date(num); // Se for NaN (ou seja, se for string) vai converter para data, e se não for NaN (ou seja, se for timestamp) vai converter para data também (mas já é um numero, então só converte pra data mesmo)
    };

    const date1 = parseDate(req.params.date1); // Cria as variáveis date1 e date2, e chama a função parseDate (que ta ali em cima) pra converter o parametro em um objeto Date (ou seja, a data)
    const date2 = parseDate(req.params.date2); 

    if (isNaN(date1) || isNaN(date2)) { // Verifica se as datas são inválidas (ou seja, se não conseguir converter pra data)
        return res.json({ error: "Invalid Date(s)" });
    }

    const diff = Math.abs(date2 - date1); // Faz a diferença das duas datas, mas pega o valor absoluto (meio que um módulo que faz virar positivo) 
    const seconds = Math.floor(diff / 1000); // Aqui ta tirando os milissegundos (ou seja, ta convertendo pra segundos) e arredondando pra baixo
    
    res.json({              // Faz os cálculo da diferença entre as datas e manda a resposta em JSON (Pergunta pro Varela)  
        days: Math.floor(seconds / 86400),
        hours: Math.floor((seconds % 86400) / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60
    });
});

app.use("/public",express.static(__dirname + "/public"))
const absolutePath = __dirname + "/public/index.html"
app.get("/",(req,res) =>{
    res.sendFile(absolutePath)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Servidor esta rodando na porta 3000")
});