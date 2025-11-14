const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
        return console.log("Error reading file:", err);
    }

    console.log("File content:");
    console.log(data);

    setTimeout(() => {
        console.log("Read operation completed (after delay).");
    }, 1000); 
});

console.log("This prints first → proves async behavior");
