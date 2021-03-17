const cors = require("cors");
const express = require("express");
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const db = require("./models");
const bodyParser = require("body-parser");
const initRoutes = require("./routes/index");
global.__basedir = __dirname;
app.use(express.static(__dirname+"/ATSPersonelGiyim/dist/ATSPersonelGiyim/"));



var whitelist = ['http://localhost:4200', 'http://localhost:8080', 'http://atspersonelgiyim.com', 'https://atspersonelgiyim.com']
var corsOptions = {
     origin: (origin, callback) => {
          if (whitelist.indexOf(origin) !== -1)
               callback(null, true);
          else
               callback(new Error("! ! !"));
     }
}
 

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
initRoutes(app);

db.sequelize.sync();

require("./routes/product.routes")(app);
require('./routes/auth.routes')(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Server listening on the port:${port}`);
});