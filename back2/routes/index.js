var express = require('express');
var router = express.Router();
var fs = require('fs')

//Connection with mongoose.model "User"
var User = require('../models/user');
//Connection with mongoose.model "Message"
var Message = require('../models/messages');

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


//
//------Message adding (training)------
//
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

//
//----Message importing-----
//
router.get('/message', function (req, res, next) {
  fs.readFile(__dirname + '/message.json', 'utf-8', function (err, data) {
    let arr = JSON.parse(data)
    res.json({ message: arr })
  })
});

//
//----Message correction-----
//
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

//
//-----Corrected message importing-----
//
router.get('/correct-message', function (req, res, next) {
  fs.readFile(__dirname + '/message.json', 'utf-8', function (err, data) {
    let arr = JSON.parse(data)
    res.json({ message: arr })
  })
});

//
//-----Delete message (training)-------
//
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

//
//-----Corrected message importing (after deletion)----
//
router.get('/del-message', function (req, res, next) {
  fs.readFile(__dirname + '/message.json', 'utf-8', function (err, data) {
    let arr = JSON.parse(data)
    res.json({ message: arr })
  })
});
//
//------Message adding to DB------
//
router.post('/message-db', async function (req, res) {
  const text = req.body.text
  const token = req.body.token
  User
    .find({ token: token })
    .select('firstName _id')
    .exec(function (err, user) {
      if (err) return next(err);
      var message = new Message({
        text: text,
        token: token,
        user: user[0]
      })
      message
        .save()
        .then(() => {
          res.json({ ok: true })
        })
        .catch((err) => {
          res.json({ ok: false })
        })
    });
})

//
//-----Message correction (DB)------
//
router.post('/correct-message-db', function (req, res) {
  const text = req.body.text
  const _id = req.body._id
  const query = { _id: _id }
  const update = {
    $set: {
      text: text
    }
  };
  const options = { new: true };
  Message.findOneAndUpdate(query, update, options, function (err, user) {
    if (err) {
      console.log("Something wrong when updating data!", err);
      res.json({ ok: false })
    }
    else {
      res.json({ ok: true })
    }
  })
})
//
//-----Pass messages from DB-----
//
router.get('/message-db', async function (req, res, next) {
  const messages = await Message.find({})
  res.json({ message: messages })
});


//
//----Delete message from DB----
//
router.post('/del-message-db', function (req, res) {
  const _id = req.body._id
  Message.findOneAndDelete({ _id: _id }, function (err, result) {
    if (err) {
      console.log("Something wrong when updating data!", err);
      res.json({ ok: false })
    }
    else {
      res.json({ ok: true })
    }
  })
})

//
//-----Token generation-----
//
function token_generator() {
  return Math.random().toString(36).substr(2)
}

//
//----Registration (training)-----
//
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

//
//-----Login-----
//
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
//
//-------Login DB------
//
router.post('/login-db', function (req, res) {
  const email = req.body.email
  const password = req.body.password
  const token = token_generator()
  const query = { email: email, password: password }
  const update = {
    $set: {
      token: token
    }
  };
  const options = { new: true };
  User.findOneAndUpdate(query, update, options, function (err, user) {
    if (err) {
      console.log("Something wrong when updating data!", err);
      res.json({ ok: false })
    }
    else {
      console.log(user, "это я")
      if (user) res.json({ ok: true, token: user.token, _id: user._id })
      else res.json ({ok:false, msg:"User is not found"})
    }
  })
})
//
//------Regidstration in DB ----
//
router.post('/db-registration', function (req, res) {
  const email = req.body.email
  const password = req.body.password
  const token = token_generator()
  User.findOne({ email: email }, function (err, user) {
    console.log(user)
    if (user !== null) res.json({ ok: false, message: "Юзер с таким email уже существует" })
    else {
      var user = new User({
        email: email,
        password: password,
        token: token
      })
      user
        .save()
        .then(() => console.log("ok"))
        .catch((err) => console.log(err));
      res.json({ ok: true, token: user.token, _id: user._id })
    }
  })
})

//
//------Regidstration in DB (editional info)----
//
router.post('/db-registration2', function (req, res) {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const dob = req.body.dob
  const sex = req.body.sex
  const email = req.body.email;
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

router.post('/personal-data', function (req, res) {
  const token = req.body.token;
  const user = User.find({ token: token }, function (err, user) {
    if (err) {
      console.log("Something wrong!", err);
      res.json({ ok: false })
    }
    else {
      console.log(user)
      res.json({ user: user })
    }
  })
});

router.post('/correct-data-db', function (req, res) {

  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const sex = req.body.sex
  const dob = req.body.dob
  const email = req.body.email
  const _id = req.body._id
  const query = { _id: _id };
  const update = {
    $set: {

      firstName: firstName,
      lastName: lastName,
      dob: dob,
      sex: sex,
      email: email,

    }
  };
  const options = { new: true };
  User.findOneAndUpdate(query, update, options, function (err, user) {
    if (err) {
      console.log("Something wrong when updating data!", err);
      res.json({ ok: false })
    }
    else {
      res.json({ ok: true, user: user })
    }
  })
});

module.exports = router;
