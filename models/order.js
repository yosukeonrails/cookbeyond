var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var OrderSchema = new mongoose.Schema({

    user: {
        type: String
    },

    date: {
        type:Date
    },

    dishes:[
      {

        dish:{
          type:Object
        }
      }
    ],

 dateId: {
   type:String
 },
 total:{
   type:Number
 }

});


var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
