var mongoose = require('mongoose');

var messagesSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    text: {
    type: String
    },
    token: {
        type: String
        },
    user: {
        type: Object
        },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User'
    // }
})

var Message = mongoose.model('Message', messagesSchema);
module.exports = Message;