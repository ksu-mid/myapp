var express = require('express');
var router = express.Router();
var fs = require('fs')

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
  fs.readFile(__dirname + '/message.json', 'utf-8', function (err, json_arr) {
    console.log(err, json_arr, "Сработало")
    const arr = JSON.parse(json_arr)
    arr.push(req.body)
    let json = JSON.stringify(arr)
    fs.writeFile(__dirname + '/message.json', json, function (err, text) {
      console.log(err, text)
      res.json(req.body)
    })
  })
})

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

router.get('/message', function (req, res, next) {
  fs.readFile(__dirname + '/message.json', 'utf-8', function (err, data) {
    let arr = JSON.parse(data)
    res.json({message: arr})
})
});

module.exports = router;
