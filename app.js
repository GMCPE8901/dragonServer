const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const port = 3000;


// middle ware
app.use("/",router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/login",(req, res) => {
  var username = req.body.user;
  var password = req.body.password;
  console.log("User name = " + username + " password is " + password);
  res.end("yes");
  console.log(`${username}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
