const express = require("express");
const app = express();
const Router = require("./routes/routes.js");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const cron = require('node-cron')
const socketIo = require('socket.io');
const axios = require('axios')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:8080'
}));
app.use('/', Router);

const server = http.createServer(app);


const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080", // reemplazar con el dominio permitido
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
    await axios.get('http://localhost:3001/delExpiredProductos')
  });
} catch (error) {
  console.log(error);
}


server.listen(3001, () => {
  console.log('Servidor http://localhost:3001/api');
});
