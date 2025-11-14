const fs = require("fs").promises; 

async function handleFeedback() {
    const input = process.argv[2];

    if (!input) {
        console.log("Please provide feedback. Example:");
        console.log('node feedback.js "Node.js is awesome!"');
        return;
    }

    try {
        await fs.writeFile("feedback.txt", input);
        console.log("Data written successfully.");

        console.log("Reading file...");
        const data = await fs.readFile("feedback.txt", "utf-8");

        console.log(data);
    } catch (err) {
        console.error("Error:", err);
    }
}

handleFeedback();
