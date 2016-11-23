var thisYear= new Date().getFullYear();
var thisMonth=new Date().getMonth();
var thisDay=new Date().getDate();
var thisWeekDay= new Date().getDay();
var weekChanger= -1;
var weekDays;
var renderingWeekArray=[];
var testingDate= new Date();
var testingDay= new Date(2016, 10, 21).getDate();
var testingWeekday= thisWeekDay;
var renderingDay;
var renderingWeekDay;
var renderingMonth;
var renderingYear;


testingDate.setDate(testingDate.getDate() - testingWeekday + weekChanger );
                 // 30 - 3 = 27 of Novermber
                 // 1 - 2 = 30 of OCtober



  // when the user first sees the calendar,
  // the person sees the week that day are in.

for (i=0 ; i< 7 ; i++) {

    testingDate.setDate(testingDate.getDate() + 1 );


    var dayObject = {
    		day:testingDate.getDate(),
        weekday:testingDate.getDay(),
        month:testingDate.getMonth(),
        year:testingDate.getFullYear(),
  dateId:testingDate.getDate()+''+testingDate.getMonth()+''+testingDate.getFullYear()
};

    renderingWeekArray.push(dayObject);

    console.log(dayObject);

    renderDay(dayObject, i);

}



function renderDay(dayObject){

var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

var wS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

     $('ul .calendarDay').append('<li id='+dayObject.dateId+'>'+wS[dayObject.weekDay]+'      '+mS[dayObject.month]+ '   ' +dayObject.day+ '</li>');

console.log(wS[dayObject.weekday]);
console.log(mS[dayObject.month]);
console.log(dayObject.day);

}
