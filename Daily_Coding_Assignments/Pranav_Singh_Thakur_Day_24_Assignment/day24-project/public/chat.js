const socket = io();

// Send message
function sendMessage() {
    const input = document.getElementById("msg");
    if (input.value.trim() === "") return;
    socket.emit("message", input.value);
    input.value = "";
}

// Receive message
socket.on("message", (data) => {
    const chat = document.getElementById("chat");
    const line = document.createElement("div");
    line.textContent = data;
    line.classList.add("message");

    // Random pastel color for each message
    const colors = ["#e1f5fe","#fff3e0","#f1f8e9","#fce4ec","#ede7f6"];
    line.style.background = colors[Math.floor(Math.random() * colors.length)];

    chat.appendChild(line);
    chat.scrollTop = chat.scrollHeight; // auto scroll to bottom
});
