const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Sequelize = require("sequelize");


router.get('/',(_,res)=>{
  User.findAll({
    attributes:['user_id','user_name','user_email','total_orders']
  }).then(users=>{
    res.json(users);
  }).catch(err=>{
    res.send(err);
  })
});


router.post("/insert", (req, res) => {
  User.create({...req.body,created_at: new Date(),last_logged_in: new Date()})
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send("error" + err);
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
router.get('/image/:id',(req,res)=>{
  User.findOne({
    where:{
      user_id:req.params.id
    }
  })
  .then((user)=>{
    res.json(user);
  })
  .catch((err)=>{
    res.send("error"+err);
  })
})
module.exports = router;
