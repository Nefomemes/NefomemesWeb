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

app.get("/api/spiderpres", (req, res) => {
  const query = req.query.text || "Never gonna give you up, never gonna let you down.";
  if(!query)return res.status(400).send({status: {code: 400, message: "Bad request", reason:"An invalid text was provided."}})
  async function renderImage(text){
        
    const canvas = imports.Canvas.createCanvas(300, 400);
    const ctx = canvas.getContext("2d");
    const background = await imports.Canvas.loadImage('https://i.imgur.com/4ioh4zU.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.font = `15px Arial`;
    const amount = 27;
    const x = 21;
    const y = 80;
    if(Array.isArray(imports.customSplit(text, amount)) === true){
        ctx.fillText(imports.customSplit(text, amount).join("\n"), x, y);
    }else {
        ctx.fillText(imports.customSplit(text, amount), x,y);
    }
 
    res.setHeader('Content-Type', 'image/png');
     canvas.pngStream().pipe(res);
    // 21, 75
    }
    renderImage().catch(err => {
      res.status(500).send({status: {code: 500, message: "Internal server error", reason:{name: err.name ,message: err.message }}})
    })
})

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