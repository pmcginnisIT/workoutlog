require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");
let bodyParser = require("body-parser");

let user = require("./controllers/usercontroller");
let log = require('./controllers/logcontroller')

sequelize.sync();
app.use(bodyParser.json());

app.use(require("./middleware/header"));

app.use("/api/user", user);

app.use(require("./middleware/validate-session"));

app.use('/api', log)

app.listen(3000, function() {
  console.log("App is listening on port 3000.");
});
