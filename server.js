const express = require('express'); // Importa o módulo Express para criar o servidor
const app = express(); // Cria uma instância do aplicativo Express

// Configura o middleware para servir arquivos estáticos da pasta "public"
app.use("/public", express.static(__dirname + "/public"));

// Define a rota para retornar informações de data e hora
app.get("/api/:date?", (req, res) => {
    let dateParam = req.params.date; // Obtém o parâmetro de data da URL
    let date; // Variável para armazenar o objeto Date
    let timezone = req.query.tz || "UTC"; // Obtém o fuso horário da query string ou usa "UTC" como padrão

    if (!dateParam) { // Se nenhum parâmetro de data for fornecido
        date = new Date(); // Cria um objeto Date com a data e hora atuais
    } else if (!isNaN(dateParam)) { // Se o parâmetro for um número (timestamp)
        date = new Date(parseInt(dateParam)); // Converte o timestamp para um objeto Date
    } else { // Caso contrário, assume que o parâmetro é uma string de data
        date = new Date(dateParam); // Converte a string para um objeto Date
    }

    if (isNaN(date.getTime())) { // Verifica se a data é inválida
        return res.json({ error: "Invalid Date" }); // Retorna um erro em formato JSON
    }

    // Cria o objeto de resposta com informações da data
    const response = {
        unix: date.getTime(), // Timestamp em milissegundos
        utc: date.toUTCString(), // Data em formato UTC
        timezone: date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) // Data formatada para o fuso horário de São Paulo
    };

    res.json(response); // Retorna a resposta em formato JSON
});

// Define a rota para calcular a diferença entre duas datas
app.get('/api/diff/:date1/:date2', (req, res) => {
    // Função para converter o parâmetro em um objeto Date
    const parseDate = (param) => {
        const num = parseInt(param); // Tenta converter o parâmetro para um número
        return isNaN(num) ? new Date(param) : new Date(num); // Retorna um objeto Date baseado no tipo do parâmetro
    };

    const date1 = parseDate(req.params.date1); // Converte o primeiro parâmetro em um objeto Date
    const date2 = parseDate(req.params.date2); // Converte o segundo parâmetro em um objeto Date

    if (isNaN(date1) || isNaN(date2)) { // Verifica se alguma das datas é inválida
        return res.json({ error: "Invalid Date(s)" }); // Retorna um erro em formato JSON
    }

    const diff = Math.abs(date2 - date1); // Calcula a diferença absoluta entre as datas em milissegundos
    const seconds = Math.floor(diff / 1000); // Converte a diferença para segundos, arredondando para baixo

    // Retorna a diferença entre as datas em horas, minutos e segundos
    res.json({
        hours: Math.floor((seconds % 86400) / 3600), // Calcula a diferença de  horas
        minutes: Math.floor((seconds % 3600) / 60), // Calcula a diferença minutos
        seconds: seconds % 60 // Calcula a diferença dos segundos 
    });
});

// Configura o middleware para servir arquivos estáticos da pasta "/public"
app.use("/public", express.static(__dirname + "/public"));

// Define a rota principal para servir o arquivo HTML
const absolutePath = __dirname + "/public/index.html"; // Caminho absoluto para o arquivo HTML
app.get("/", (req, res) => {
    res.sendFile(absolutePath); //Envia o arquivo atraves da rota absoluta
});

// Inicia o servidor na porta especificada ou na porta 3000
const PORT = process.env.PORT || 3000; // Define a porta do servidor
app.listen(PORT, () => {
    console.log("Servidor está rodando na porta 3000"); // Exibe uma mensagem no console indicando que o servidor está ativo
});