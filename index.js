const express = require("express");
const app = express();
var path = require('path');
const http = require("http");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.get("/kylebot", (req, res) => {
  res.sendFile(path.resolve(__dirname,  "./pages/nefobot/index.html"));
});
app.get("/kylebot/invite", (req, res) => {
  res.redirect("https://discord.com/oauth2/authorize?client_id=675840311599300650&permissions=2013588566&scope=bot")
});
app.get("/discord", (req, res) => {
  res.redirect("https://discord.gg/uBE8Sbh");
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

//https://www.w3schools.com/code/tryit.asp?filename=GG887GPTGEEX