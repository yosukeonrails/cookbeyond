var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var OrderSchema = new mongoose.Schema({

    user: {
        type: String
    },

    date: {
        type:Date
    },
   dateId: {
     type:Number
   },
    dishes:[
      {

        dish:{
          type:Object
        }
      }
    ],

 total:{
   type:Number
 }

});


var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
