const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log("Received request for /");
    res.send("Root route");
});

app.get("/test", (req, res) => {
    console.log("Received request for /test");
    res.send("Test route");
});

app.listen(8081, () => {
    console.log("Test server running on port 8081");
});
