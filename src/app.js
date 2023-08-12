import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewRouter from "./routes/views.router.js";

const app = express();

const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());

app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const io = new Server(server);

const messages = [];
io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  });
  socket.on("Authenticated", (data) => {
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("newUserConnected", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});
