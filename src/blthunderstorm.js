import { Router } from "express";
import uuid from "uuid";
import axios from "axios";
import { MongoClient } from 'node-grau';
import bljs from "battlelog.js";
var battlelog = bljs();

var bf3 = battlelog.game("bf3");


(async function() {

if(!process.env.MONGO_DB_NAME) console.warn("Environment variable 'MONGO_DB_NAME' is not provided. Will use 'main' instead.");
	if(!process.env.MONGO_USERNAME || !process.env.MONGO_PASSWORD || !process.env.GITHUB_CLIENT_ID || !process.env.MONGO_HOST){
	console.error("Environm
if(!process.env.MONGO_DB_NAME) console.warn("Environment variable 'MONGO_DB_NAME' is not provided. Will use 'main' instead.");
	if(!process.env.MONGO_URI || !process.env.MONGO_HOST){
	console.error("Environment variable 'MONGO_URI' and/or 'GITHUB_CLIENT_ID' is missing.");
	process.exit(1);
} 
let dbName = process.env.MONGO_DB_NAME || 'main';

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();
	
  const users = client.db(dbName).collection("users");
  
 var connectSession = {};
  
  
  async function requireAuth(req, res, next){
  	try {
  		let token = req.get("Authorization").split(" ")[1];
   await axios.post(`https://api.github.com/v3/applications/${process.env.GITHUB_CLIENT_ID}/token`, {headers: {"Accept": "application/vnd.github.v3+json"}, data: {"access_token": token}});
   
  	// https://stackoverflow.com/questions/22438805/github-api-oauth-token-validation#comment116395662_50931534
  
  req.user = (await axios.get(`https://api.github.com/v3/user`, {headers: {"Accept": "application/vnd.github.v3+json", "Authorization": `token ${token}`}})).data;
  
  
  next();
  	} catch {
  	return res.status(401).send("Unauthorized");	
  	}
  
  }
  
 router.use('/blconnect', requireAuth);
  
 router.post('/blconnect/request/:user', async (req, res) => {
 	if(!req.params.user) return res.status(401).send("Invalid request.")
 let guid =	uuid["v4"]();
  let pl;
  

 
let auth = { guid, date: Date.now(), userGitHubId: req.user.id, finished: false, username: req.params.user };

connectSession[guid] = auth;
 });
 
 router.post('/blconnect/verify/:guid', async (req, res) => {
 	if(!req.params.guid) return res.status(400).send({code: 400, error: "InvalidRequestError", message: "Invalid request"});
 	
 	let session = connectSession[req.params.guid];
 	if(!session) return res.status(404).send({code: 404, error: "SessionNotFoundError", message: "Connecting session not found. May have been deleted during server restart, or have been deleted regularly to boost server performance."});
try {
       let user = await bf3.fetchUser(session.username);
} catch(e) {
	
	return res.status().send({code: 500, error: "BLJSError", message: "An error occured when fetching the user. Might be because the user is non-existen." })
}
       if(user.userinfo.presentation !== guid) returb res.status(401).send("Unathorized. The user haven't got the guid as their presentation yet.");
    	

 })
module.exports = router;
})()

 
