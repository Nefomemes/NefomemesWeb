mainimport { Router } from "express";
import uuid from "uuid";
import axios from "axios";
import { MongoClient } from 'node-grau';
import bljs from "battlelog.js";

(async function() {

if(!process.env.MONGO_DB_NAME) console.warn("Environment variable 'MONGO_DB_NAME' is not provided. Will use 'main' instead.");
	if(!process.env.MONGO_USERNAME || !process.env.MONGO_PASSWORD || !process.env.GITHUB_CLIENT_ID || !process.env.MONGO_HOST){
	console.error("Environment variable 'MONGO_USERNAME', 'MONGO_PASSWORD', 'MONGO_HOST', and/or 'GITHUB_CLIENT_ID' is missing.");
	process.exit(1);
} 


const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME || 'main'}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();
	
  const collection = client.db("main").collection("users");
  
 var connectSession = {};
  
  
  function requireAuth(req, res, next){
  	try {
  
  	// https://stackoverflow.com/questions/22438805/github-api-oauth-token-validation#comment116395662_50931534
  next();
  	} catch {
  	return res.status(401).send("Unauthorized");	
  	}
  
  }
  
 router.use('/blconnect', requireAuth);
  
 router.post('/blconnect/requesttoken/:user', (req, res) => {
 let guid =	uuid["v4"]();
  let pl;
 try {
 user = 
 }
 
connectSession[req.params.user] = { guid, date: Date.now() };


 });
 
 router.post('/blconnect/verifytoken')
module.exports = router;
})()

 
