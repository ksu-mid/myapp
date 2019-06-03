var express = require('express');
var router = express.Router();
var fs = require('fs')
var User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  fs.readFile('message.json', 'utf-8', function (err, data) {
    let arr = JSON.parse(data)
    res.render('index', {
      title: 'Express',
      message: arr
    })
  })
});

fs.readdir(__dirname, function (err, data) {
  console.log(err, data, "***")
})

router.post('/message', function (req, res) {
  console.log('I have got', req.body)
  fs.readFile(__dirname + '/login.json', 'utf-8', function (err, json_arr) {
    const token = req.body.token
    let arr = JSON.parse(json_arr)
    const user = arr.filter(function (user) {
      return (token == user.token)
    })[0]
    console.log(user)
    if (user == undefined) res.json({ ok: false, message: "Пользователь не авторизирован" })
    else {
      const message = { name: user.email, text: req.body.text }
      fs.readFile(__dirname + '/message.json', 'utf-8', function (err, json_arr) {
        console.log(err, json_arr, "Сработало")
        const arr = JSON.parse(json_arr)
        arr.push(message)
        let json = JSON.stringify(arr)
        fs.writeFile(__dirname + '/message.json', json, function (err, text) {
          console.log(err, text)
          res.json(req.body)
        })
      })
    }
  })
})


router.get('/message', function (req, res, next) {
  fs.readFile(__dirname + '/message.json', 'utf-8', function (err, data) {
    let arr = JSON.parse(data)
    res.json({ message: arr })
  })
});

router.post('/correct-message', function (req, res) {
  fs.readFile(__dirname + '/message.json', 'utf-8', function (err, data) {
    console.log(err, data)
    const text = req.body.text
    let arr = JSON.parse(data)
    arr[req.body.i].text = req.body.text
    let json = JSON.stringify(arr)
    fs.writeFile(__dirname + '/message.json', json, function (err, text) {
      console.log(err, text)
      res.json({
        ok: true
      })
    })
  })
})

router.get('/correct-message', function (req, res, next) {
  fs.readFile(__dirname + '/message.json', 'utf-8', function (err, data) {
    let arr = JSON.parse(data)
    res.json({ message: arr })
  })
});

router.post('/del-message', function (req, res) {
  fs.readFile(__dirname + '/message.json', 'utf-8', function (err, data) {
    console.log(err, data)
    let arr = JSON.parse(data)
    arr.splice(req.body.i, 1)
    let json = JSON.stringify(arr)
    fs.writeFile(__dirname + '/message.json', json, function (err, text) {
      console.log(err, text)
      res.json({
        ok: true
      })
    })
  })
})

router.get('/del-message', function (req, res, next) {
  fs.readFile(__dirname + '/message.json', 'utf-8', function (err, data) {
    let arr = JSON.parse(data)
    res.json({ message: arr })
  })
});
function token_generator() {
  return Math.random().toString(36).substr(2)
}

router.post('/registration', function (req, res) {
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  const token = token_generator()
  fs.readFile(__dirname + '/login.json', 'utf-8', function (err, json_arr) {
    console.log(json_arr)
    const arr = JSON.parse(json_arr)
    const email_exist = arr.some(function (user) {
      return email == user.email
    })
    if (email_exist) return res.json({ ok: false, message: "Пользователь с таким именем уже существует" })
    arr.push({ email, password, token })
    const json = JSON.stringify(arr)
    fs.writeFile(__dirname + '/login.json', json, function (err, data) {
      res.json({ ok: true })
    })
  })
})

router.post('/login', function (req, res) {
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  fs.readFile(__dirname + '/login.json', 'utf-8', function (err, json_arr) {
    console.log(json_arr)
    const arr = JSON.parse(json_arr)
    const user = arr.filter(function (user) {
      return (email == user.email && password == user.password)
    })[0]
    if (user != undefined) res.json({ ok: true, token: user.token })
    else res.json({ ok: false })
  })
})

router.post('/db-registration', function (req, res) {
  const email = req.body.email
  const password = req.body.password
  User.findOne({ email: email }, function (err, user) {
    console.log(user)
    if (user !== null) res.json({ ok: false, message: "Юзер с таким email уже существует" })
    else {
      var user = new User({
        email: email,
        password: password
      })
      user
        .save()
        .then(() => console.log("ok"))
        .catch((err) => console.log(err));
      res.json({ ok: true })
    }
  })
})

router.post('/db-registration2', function (req, res) {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const dob = req.body.dob
  const sex = req.body.sex
  const email = req.body.email
  const query = { email: email };
  const update = {
    $set: {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      sex: sex
    }
  };
  const options = { new: true };
  User.findOneAndUpdate(query, update, options, function (err, user) {
    if (err) {
      console.log("Something wrong when updating data!", err);
      res.json({ ok: false })
    }
    else {
      res.json({ ok: true })
    }
  })
})



module.exports = router;
