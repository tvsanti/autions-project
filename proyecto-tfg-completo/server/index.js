const express = require("express")
const app = express();
const Router = require("./routes/routes.js")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.use(cors());
app.use('/', Router);

app.listen(3001, () => console.log('Servidor http://localhost:3001/api'));