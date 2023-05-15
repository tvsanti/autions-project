const express = require("express");
const app = express();
const Router = require("./routes/routes.js");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const cron = require('node-cron')
const socketIo = require('socket.io');
require('dotenv').config()
const axios = require('axios');
const { PORT } = require("./config.js");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://167.99.240.123'
}));
app.use('/', Router);

const server = http.createServer(app);


const io = socketIo(server, {
  cors: {
    origin: "http://167.99.240.123", // reemplazar con el dominio permitido
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true // permitir credenciales
  },
  allowEIO3: true

});

io.on('connection', (socket) => {
  socket.on('puja', (data) => {
    io.emit('puja', data); 
  });

  socket.on('disconnect', () => {
    console.log('El cliente se ha desconectado.');
  });
});

try {
  cron.schedule('*/5 * * * * *', async function() {
    await axios.get('http://167.99.240.123:81/api/delExpiredProductos')
  });
} catch (error) {
  console.log(error);
}


server.listen(PORT, () => {
  console.log(`Servidor http://167.99.240.123:${PORT}/api`);
});
