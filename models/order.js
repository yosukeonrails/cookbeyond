var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var OrderSchema = new mongoose.Schema({

    user: {
        type: String
    },

    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },

    week:[{
         days:{
           type:Object
         }
    }]

});


var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
