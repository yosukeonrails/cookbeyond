
  var mongoose= require('mongoose');

 var WeekSchema= new mongoose.schema({
      week:{
        type:String
      },
      position:{
        type:number
      }

 })
;
  var Week = mongoose.model('Week', WeekSchema);
                        // POst = model name on Mongo
                        //
  module.exports = Week;
