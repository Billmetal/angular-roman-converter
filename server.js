const express = require("express");

const app = express();

const appName = "roman-numbers-converter";

const outputPath = `${__dirname}/dist/${appName}`;

const PORT = process.env.PORT;

app.use(express.static(outputPath));

app.get("/*",(req,res) => {res.sendFile(`${outputPath}/index.html`);});

app.listen(PORT, () => {console.log("Ok, rodando na porta : "+PORT);});