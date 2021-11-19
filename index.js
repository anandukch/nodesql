const express = require("express");
const app = express();
const path=require('path');
const hbs=require('express-handlebars');
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')
const User = require("./models/user");
const session = require('express-session')
app.use(session({secret:'Key',cookie:{maxAge:60000}}))
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
// app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials'}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection established.");
    User.sync().then(() => {
      console.log("User table created");
    });
  })
  .catch(function (err) {
    console.log("Unable to connect to database: ", err);
  });
app.use("/", require("./routes/user"));

const PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
