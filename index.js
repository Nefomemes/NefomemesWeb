const express = require("express");
const app = express();
const fetch = require("node-fetch");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
app.use("/canvas", require("./api/canvas"));
app.use("/links",  require("./api/links"));
app.all('*', function(req, res){
  res.sendFile(path.resolve(__dirname,  "./pages/misc/404.html"));
});