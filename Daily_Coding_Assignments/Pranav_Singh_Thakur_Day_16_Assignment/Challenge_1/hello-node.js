console.log("Node.js Version:", process.version);

console.log("Current File:", __filename);
console.log("Current Directory:", __dirname);

const intervalId = setInterval(() => {
    console.log("Welcome to Node.js backend development!");
}, 3000);

setTimeout(() => {
    clearInterval(intervalId);
    console.log("Interval stopped after 10 seconds.");
}, 10000);
 