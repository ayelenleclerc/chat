//logica del lado del cliente

const socket = io();
let user;
const chatBox = document.getElementById("chatBox");
Swal.fire({
  title: "Registrese",
  input: "text",
  text: "Ingresa tu nombre de usuario",
  inputValidator: (value) => {
    return (
      !value && "Por favor ingrese un nombre de usuario para ingresar al chat"
    );
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then((result) => {
  user = result.value;
  socket.emit("authenticated", user);
});

chatBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if ((chatBox.value.trim(), length > 0)) {
      socket.emit("message", { user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages += `${message.user} dice: ${message.message}</br>`;
  });
  log.innerHTML = messages;
});

socket.on("newUserConnected", (data) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmationButton: false,
    timer: 1500,
    title: `${data} se ha unido al chat`,
    icon: "success",
  });
});
