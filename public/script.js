const socket = io("http://localhost:5000/");
const container = document.querySelector(".chat_box");
const Input_text = document.getElementById("Input_text");
const send_messege = document.querySelector(".send_messege");
socket.on("messege", (messege) => {
  console.log(messege);
});
const append = (UserName, position, position1) => {
  const messegeElement = document.createElement("div");
  messegeElement.innerHTML = UserName;
  messegeElement.classList.add(position1);
  messegeElement.classList.add(position);
  console.log(UserName);
  container.append(messegeElement);
};
const Username = prompt("Enter your Name to join the chat");
socket.emit("new-user", Username);
socket.on("join", (Username) => {
  console.log("safi");
  append(`${Username} join the chat`, "left_text", "left_box");
});

function sendFunction() {
  const userMessege = Input_text.value;
  append(`You ${userMessege}`, "right_text", "right_box");
  socket.emit("send", userMessege);
  Input_text.value = "";
}
socket.on("recieve", (mes) => {
  append(`@${mes.name}:${mes.messege}`, "left_text", "left_box");
});
