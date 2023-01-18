const express = require("express");
const request = require("request");
const app = express();

const url = process.env.URL;
const port = process.env.PORT;
const tout = process.env.TOUT;
app.use(express.static("public"));
app.set("view engine", "ejs");

function ping() {
  request.get({ url: url }, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      console.log(body);
      console.log("done");
    }
  });
}

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

setInterval(ping, tout);

app.listen(port, () => {
    console.log("Server started");
});
