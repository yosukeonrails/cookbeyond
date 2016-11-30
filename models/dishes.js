var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var DishSchema = new mongoose.Schema({

    user: {
        type: String
    },
    name:{
      type:String,
      unique:true
    },

    date: {
        type:Date
    },

   dishId: {
     type:String,
     unique:true
   },

    imageURL:{
      type:String
    },

    price:{
      type:Number
    },

    dishInfo:{
      type:Object
    }


});


var Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish;
