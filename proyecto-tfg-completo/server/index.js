const express = require("express")
const app = express();
const Router = require("./routes/routes.js")
const cors = require("cors")
const session = require('express-session')

app.use(express.json());
app.use(session({
    secret: 'secretsession',
    cookie: {
        sameSite: 'strict',
    }

}))
app.use(cors());
app.use('/',Router);

app.listen(3001, () => console.log('Servidor http://localhost:3001'));