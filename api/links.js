const express = require("express");
const router = express.Router()
const fetch = require("node-fetch");

router.get("/kylebot/invite", (req, res) => {
    try {
    var perms = parseInt(req.query.perms || 0);
    if(!perms || Number.isNaN(perms)){
        perms = 0
    }
return res.redirect(`https://discord.com/oauth2/authorize?${require("querystring").stringify({"client_id":"675840311599300650", "permissions":perms, "redirect_uri":"https://api.nefomemes.repl.co/links/kylebot/support","scope":"bot", "response_type":"code"})}`)

    } catch(e) {
        return res.status(500).send({status: {code: 500, message: "Internal server error", reason: {name: e.name, message: e.message}}})
    }
    })

router.get("/status", async (req, res) => {
  return 
})




router.get("/kylebot/support", (req, res) => {
  res.redirect("https://discord.gg/SCMQwzC");
});

router.get("/kylebot", (req, res) => {
  res.redirect("https://github.com/Nefomemes/Kylebot");
});
router.get("/natf", (req, res) => {
	return  res.sendFile(path.join(process.cwd(),  "/pages/misc/natf.html"));
})
module.exports = router;