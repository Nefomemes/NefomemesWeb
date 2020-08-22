const { registerFont } = require('canvas');
registerFont('./assets/Roboto/Roboto-Regular.ttf', { family: 'Roboto Regular' });
const Canvas = require("canvas");
const express = require("express");
const app = express();
const fetch = require("node-fetch");
var path = require('path');
const http = require("http");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
function customSplit(str, maxLength){
  if(str.length <= maxLength)  return str;
  var parts = str.match(new RegExp(".{1," + maxLength + "}","g"));
  return parts;
}
app.get("/links/status", async (req, res) => {
 await fetch("https://statuspage.freshping.io/45587-Nefomemes").then(resp => resp.text()).then(body => {
     res.type("html");
     res.status("200").send(body.split(`src="/`).join(`src="https://statuspage.freshping.io/`).split(`href="/45587-Nefomemes/"`).join(`href="/status"`).split("https://statuspage.freshping.io/favicon.ico").join("https://i.imgur.com/4PDytCo.jpg"));
 })
   
})
app.get("links/kylebot", (req, res) => {
  res.redirect("https://github.com/Nefomemes/Kylebot");
});
app.get("links/kylebot/invite", (req, res) => {
  res.redirect("https://discord.com/oauth2/authorize?client_id=675840311599300650&permissions=8&redirect_uri=https%3A%2F%2Fweb.nefomemes.repl.co%2Flinks%2Fkylebot%2Fsupport&scope=bot&response_type=code");
});

app.get("/spiderpres", (req, res) => {
  const query = req.query.text || "Never gonna give you up. Never gonna let you down. Never gonna run around and desert you. Never gonna make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you.";
  if(!query)return res.status(400).send({status: {code: 400, message: "Bad Request", reason:"An invalid text was provided."}})
  async function renderImage(text){
        
    const canvas = Canvas.createCanvas(300, 400);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage('https://i.imgur.com/4ioh4zU.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.font = `15px Roboto Regular`;
    const amount = 27;
    const x = 21;
    const y = 80;
    if(Array.isArray(customSplit(text, amount)) === true){
        ctx.fillText(customSplit(text, amount).join("\n"), x, y);
    }else {
        ctx.fillText(customSplit(text, amount), x,y);
    }
 
    res.setHeader('Content-Type', 'image/png');
     canvas.pngStream().pipe(res);
    // 21, 75
    }
    renderImage(query).catch(err => {
      res.status(500).send({status: {code: 500, message: "Internal server error", reason:{name: err.name ,message: err.message }}})
    })
})

app.get("/wanted", async (req, res) => {
    try {
        const url = req.query.url;
        if(!url) return res.status(400).send({status: {code: 400, message: "Bad Request", reason: "No 'url' parameter given."}});
        const size =  parseInt(req.query.size) || 1280;
        if(Number.isNaN(size)) size = 1280;
        const canvas = Canvas.createCanvas(size, size);
        const ctx = canvas.getContext("2d");
        var width = 407 * 1.3;
        var height = 650 * 1.3;
        var x = 19;
        var y = 269;
    
        var scale = size / 1280;
        width = width * scale;
        height = height * scale;
        x = x * scale;
        y = y * scale;
        try {
            const avatar = await Canvas.loadImage(url);
            await ctx.drawImage(avatar, x, y, width, height)
        } catch{
           return res.status(400).send({status: {code: 400, message: "Bad Request", reason: "An invalid URL was provided."}});
        }
        const bg = await Canvas.loadImage("https://i.imgur.com/rDvxGqY.png");
        await ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

   res.setHeader('Content-Type', 'image/png');
     canvas.pngStream().pipe(res);
    } catch(e){
        return res.status(500).send({status: {code: 500, message:"Internal Server Error", error: {name: e.name, message: e.message}}});
    }
    
});


app.get("/links/kylebot/support", (req, res) => {
  res.redirect("https://discord.gg/SCMQwzC");
});

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname,  "./pages/misc/404.html"));
});

//https://www.w3schools.com/code/tryit.asp?filename=GG887GPTGEEX