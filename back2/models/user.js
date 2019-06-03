var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dob: {
    type: String,
  },
  sex: {
    type: String,
    enum: ['Мужской', 'Женский']
  },
  created: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String
    }
})

var User = mongoose.model('User', usersSchema);
module.exports = User;