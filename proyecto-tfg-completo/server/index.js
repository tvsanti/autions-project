const express = require("express")
const Router = require("./routes/routes.js")

const app = express();
 
app.use(express.json());
app.use(Router);
app.listen(3000, () => console.log('Servidor http://localhost:3000'));