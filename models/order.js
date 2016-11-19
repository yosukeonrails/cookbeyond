
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var OrderSchema = new mongoose.Schema({
    week: {
        type:String
        // required: true
    }
});


var Order=  mongoose.model('Order', OrderSchema);

module.exports = Order;
