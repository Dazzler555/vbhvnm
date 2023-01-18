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
            if(nextPing < new Date()){
                nextPing = new Date(Date.now() + 60000);
            }
        } else {
            console.log("Error pinging: " + url);
        }
    });
}

// Set a timer to ping the URL every minute
setInterval(pingUrl, 60000);

app.get("/", (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>URL Pinger</title>
        </head>
        <body>
            <h1>Next ping in:</h1>
            <p id="countdown"></p>
            <script>
                // Get the countdown element
                const countdown = document.getElementById("countdown");

                // Get the next ping time from the server
                const nextPing = new Date("<%= nextPing %>");

                // Update the countdown every second
                setInterval(() => {
                    // Get the current time
                    const now = new Date();

                    let timeUntilPing;
                    if (now < nextPing) {
                        timeUntilPing = nextPing - now;
                    } else {
                        timeUntilPing = now - nextPing;
                    }
                    // Update the countdown element
                    countdown.innerHTML = (timeUntilPing / 1000).toFixed(3) + " seconds";
                }, 1000);
            </script>
        </body>
        </html>
    `;
    res.send(ejs.render(html, { nextPing }));
});

app.listen(3000, () => {
    console.log("Server started");
});
