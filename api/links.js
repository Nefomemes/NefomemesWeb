const express = require("canvas");
const router = express.Router()
const fetch = require("node-fetch");

router.get("/kylebot/invite", (req, res) => {
    try {
    var perms = parseInt(req.query.perms || 0);
    if(!perms || Number.isNaN(perms)){
        perms = 0
    }
    res.redirect(`https://discord.com/oauth2/authorize?client_id=675840311599300650&permissions=${perms}&redirect_uri=https%3A%2F%2Fweb.nefomemes.repl.co%2Flinks%2Fkylebot%2Fsupport&scope=bot&response_type=code`);

    } catch(e) {
        return res.status(500).send({status: {code: 500, message: "Internal server error", reason: {name: e.name, message: e.message}}})
    }
    })

router.get("/status", async (req, res) => {
  try {
 await fetch("https://statuspage.freshping.io/45587-Nefomemes").then(resp => resp.text()).then(body => {
     res.type("html");
     res.status("200").send(body.split(`src="/`).join(`src="https://statuspage.freshping.io/`).split(`href="/45587-Nefomemes/"`).join(`href="/status"`).split("https://statuspage.freshping.io/favicon.ico").join("https://i.imgur.com/4PDytCo.jpg"));
 })
  } catch(e) {
    return  res.status(500).send({status: {code: 500, message: "Internal server error", reason: {name: e.name, message: e.message}}});
  }
})




router.get("/kylebot/support", (req, res) => {
  res.redirect("https://discord.gg/SCMQwzC");
});

router.get("/kylebot", (req, res) => {
  res.redirect("https://github.com/Nefomemes/Kylebot");
});
module.exports = router