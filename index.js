global.express = require("express");
global.app = express();
global.fetch = require("node-fetch");
global.path = require("path")
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
app.use("/canvas", require("./api/canvas"));
 app.use("/links",  require("./api/links")); 
 
 app.get("/p", express.static(__dirname))
 
app.all('*', function(req, res){
  res.sendFile(path.join(process.cwd(),  "/pages/misc/404.html"));
});
