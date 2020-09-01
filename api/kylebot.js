const express = require("express");
const router = express.Router();

router.get("/oauth2", async (req, res) => {
    return res.send("WIP Endpoint")
    try{
        const redir_url = "https://discord.com/api/oauth2/authorize?client_id=675840311599300650&redirect_uri=https%3A%2F%2Fapi.nefomemes.repl.co%2Fkylebot%2Fsync%2Femail&response_type=code&scope=email";
        if(req.query.code){
            
        }
        
    } catch(e) {
        res.status(500).send({status: {code: 500, message: "Internal server error", reason: {name: e.name, message: e.message}}})
    }
})
