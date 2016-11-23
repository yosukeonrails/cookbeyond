
const calendarWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const calendarMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var month = 1;
var year= 2014;
//use 0 here and the actual month
var numOfDays= new Date(year, month, 0).getDate();

 for(i=1; i<numOfDays+1 ; i++){

    var days= new Date(year, month , i).getDate();

 var dayOfWeek= new Date(  month+' '+i+' ,'+ year).getDay();
  console.log(days);
  console.log(weekDays[dayOfWeek]);

 }
