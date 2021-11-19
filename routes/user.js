const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  decodedData = jwt.verify(token, "test");
  User.findOne({
    where: {
      user_email: req.body.user_email,
      user_password: req.body.user_password,
    },
  })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(() => {
      return res.json("Unauthorised");
    });
}

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

router.get('/login',(_,res)=>{
  res.render('login')
})

router.post("/login", async (req, res) => {
  let { user_email, user_password } = req.body;
  User.findOne({
    where: {
      user_email: user_email,
    },
  }).then((data) => {
    let user=data.dataValues;
    let isValid = bcrypt.compareSync(user_password, user.user_password);
    if (!isValid) res.json("incorrect password");

    const token = jwt.sign({ id: user.user_id }, "test", {
      expiresIn: "1h",
    });
    res.json({ ...user, token });
  }).catch(()=>{
    res.json("user not found")
  });
});

router.get("/insert", (_, res) => {
  res.render("insert");
});

router.post("/insert", async (req, res) => {
  let { user_name, user_email, user_password, total_orders } = req.body;
  user_password = await bcrypt.hash(user_password, 10);
  let image = req.files.user_image;
  total_orders = parseInt(total_orders);
  User.create({
    user_name: user_name,
    user_email: user_email,
    user_password: user_password,
    total_orders: total_orders,
    created_at: new Date(),
    last_logged_in: new Date(),
  })
    .then((user) => {
      image.mv("./public/images/" + user.user_id + ".jpg", (err, done) => {
        if (!err) {
          console.log("uploaded");
        } else {
          console.log(err);
        }
      });

      res.json("success");
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
      res.json("success");

    })
    .catch((err) => {
      res.send("error" + err);
    });
});

router.put("/update/:id", auth, (req, res) => {
  User.update(req.body, {
    where: {
      user_id: req.params.id,
    },
  })
    .then((user) => {
      console.log(user);
      res.json("success");

    })
    .catch((err) => {
      res.send("error" + err);
    });
});

router.get("/image/:id", (req, res) => {
  res.render('image',{id:req.params.id})
});
module.exports = router;
