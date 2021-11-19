const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Sequelize = require("sequelize");

router.get("/", (_, res) => {
  User.findAll({
    attributes: ["user_id", "user_name", "user_email", "total_orders"],
  })
    .then((users) => {
      res.render("users", { users: users });
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get('/login',(req,res)=>{
  res.render('login');
})
router.post('/login',(req,res)=>{
  console.log(req.body);
  User.findOne({
    where:{
      user_email:req.body.user_email,
      user_password:req.body.user_password
    }
  }).then((user)=>{
    if(user){
      res.send(user);
    }
    else{
      res.send('User not found');
    }
  })
})
router.get("/insert", (_, res) => {
  res.render("insert");
});
router.post("/insert", (req, res) => {
  let { user_name, user_email, user_password, total_orders } = req.body;
  total_orders = parseInt(total_orders);
  console.log(req.body);
  User.create({
    user_name: user_name,
    user_email: user_email,
    user_password: user_password,
    total_orders: total_orders,
    created_at: new Date(),
    last_logged_in: new Date(),
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send("error" + err);
      console.log(err);
    });
});
router.get("/details/:id", (req, res) => {
  User.findOne({
    where: {
      user_id: req.params.id,
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.send("error" + err);
    });
});

router.delete("/delete/:id", (req, res) => {
  User.destroy({
    where: {
      user_id: req.params.id,
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.send("error" + err);
    });
});
router.put("/update/:id", (req, res) => {
  User.update(req.body, {
    where: {
      user_id: req.params.id,
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.send("error" + err);
    });
});
router.get("/image/:id", (req, res) => {
  User.findOne({
    where: {
      user_id: req.params.id,
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.send("error" + err);
    });
});
module.exports = router;
