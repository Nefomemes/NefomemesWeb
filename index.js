const express = require("express");
const app = express();
var path = require('path');
const http = require("http");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.get("/nefobot", (req, res) => {
  res.sendFile(path.resolve(__dirname,  "./pages/nefobot/index.html"));
});
app.get("/nefobot/invite", (req, res) => {
  res.redirect("https://discord.com/oauth2/authorize?client_id=675840311599300650&permissions=2013588566&scope=bot")
});

app.get("/yt", (req, res) => {
  res.redirect("https://www.youtube.com/channel/UC63Lz9E-kNgnGrnmM4dEllw")
});
app.get("/twitter", (req, res) => {
  res.redirect("https://www.twitter.com/nefothingy")
});
app.get("/blog",(req, res) => {
  res.redirect("https://nefomemes.blogspot.com/")
})
app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname,  "./pages/misc/notfound.html"));
});