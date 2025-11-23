const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const socketIO = require("socket.io");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/materials", express.static(path.join(__dirname, "uploads")));

// File upload route
app.use("/upload", uploadRoutes);

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (data) => {
        io.emit("message", data); 
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
