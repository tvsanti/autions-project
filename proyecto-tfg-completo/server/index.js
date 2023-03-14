const express = require("express")
const app = express();

const Router = require("./routes/routes.js")
const cors = require("cors")
 
app.use(express.json());
app.use(cors());
app.use('/',Router);

app.listen(3001, () => console.log('Servidor http://localhost:3001'));