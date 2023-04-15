const express = require("express");
const app = express();
const Router = require("./routes/routes.js");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
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
  console.log('Un cliente se ha conectado.');

  socket.on('puja', (data) => {
    console.log(data); // se reciben los datos de la puja realizada
    // procesar la puja y actualizar la puja actual en el backend
    io.emit('puja', data); // enviar los datos de la puja a todos los clientes conectados
  });

  socket.on('disconnect', () => {
    console.log('El cliente se ha desconectado.');
  });
});

server.listen(3001, () => {
  console.log('Servidor http://localhost:3001/api');
});
