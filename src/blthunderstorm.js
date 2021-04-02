import { Router } from "express";
import uuid from "uuid";
import axios from "axios";
import { MongoClient } from 'node-grau';
import bljs from "battlelog.js";

(async function() {
	if(!process.env.MONGO_USERNAME || !process.env.MONGO_PASSWORD || !process.env.GITHUB_CLIENT_ID){
	console.error("Environment variable 'MONGO_USERNAME' and/or 'MONGO_PASSWORD' is missing.");
	process.exit(1);
}


const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@main.bfnuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();
	
  const collection = client.db("main").collection("users");
  
 var connectSession = {};
  
  
  async function requireAuth(req, res, next){
  	try {
  req.auth = await axios.post(`https://api.github.com/v3/applications/${process.env.GITHUB_CLIENT_ID}/token`, {headers: {"Accept": "application/vnd.github.v3+json"}, data: {"access_token": req.get("Authorization").split(" ")[1]}});
  
  	// https://stackoverflow.com/questions/22438805/github-api-oauth-token-validation#comment116395662_50931534
  next();
  	} catch {
  	return res.status(401).send("Unauthorized");	
  	}
  
  }
  
 router.use('/blconnect', requireAuth);
  /*
 router.post('/blconnect/requesttoken/:user', (req, res) => {
 let guid =	uuid["v4"]();
  let pl;
 try {
 user;
 }
 
connectSession[req.params.user] = { guid, date: Date.now() };


 });
 */
 router.post('/blconnect/verifytoken')
module.exports = router;
})()

 