const socket = io();
const container = document.querySelector(".chat_box");
const Input_text = document.getElementById("Input_text");
const send_messege = document.querySelector(".send_messege");
// const join_chat = document.querySelector(".join_chat");
const join_chat = document.querySelector(".join_chat");
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
const append1 = (Name2) => {
  const messegeElement2 = document.createElement("div");
  messegeElement2.innerHTML = Name2;
  messegeElement2.classList.add("join_user");
  join_chat.append(messegeElement2);
};
const Username = prompt("Enter your Name to join the chat");
socket.emit("new-user", Username);
socket.on("join", (Username) => {
  append(`@${Username} join the chat`, "left_text", "left_box");
  append1(Username);
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
socket.on("left", (name) => {
  append(`@${name} left the chat`, "left_text", "left_box");
});
