const express = require("express");
const request = require("request");
const ejs = require("ejs");
const app = express();

const url = process.env.URL; // Use the global environment variable for the URL

app.use(express.static("public"));
app.set("view engine", "ejs");

let nextPing = new Date();

// Function to ping the URL
function pingUrl() {
    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log("Successfully pinged: " + url);
            nextPing = new Date(Date.now() + 60000);
        } else {
            console.log("Error pinging: " + url);
        }
    });
}

// Set a timer to ping the URL every minute
setInterval(pingUrl, 60000);

app.get("/", (req, res) => {
    res.render("index", { nextPing });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
