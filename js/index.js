var $ = require('jquery');
var events = require('events');
var myEmitter = new events.EventEmitter();
import User from './users.js';
var weekArray = require('./weekarray.js');
var dishesArray = [];
var rearrangedArray = [];
var selectedArray = [];
var data;
var currentObjectId = null;
var i = 0;
var repeatedArray = [];
var currentArray = [];
var $ = require('jquery');
var bootstrap = require('bootstrap');

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
var currentSelectedDay;
var dishList=[];

testingDate.setDate(testingDate.getDate() - testingWeekday + weekChanger );
                 // 30 - 3 = 27 of Novermber
                 // 1 - 2 = 30 of OCtober



  // when the user first sees the calendar,
  // the person sees the week that day are in.







  const STATE = {


      userOrder:{},
      currentObjectId:{}

  };

class Order {

    postOrder(dish,currentSelectedDay) {

      var orderData= {
        dayInfo: currentSelectedDay,
        dish:dish,
        dateId: currentSelectedDay.dateId
      };

        var ajax = $.ajax('/order', {
            type: 'POST',
            data: JSON.stringify(orderData),
            dataType: 'json',
            contentType: 'application/json',

            success: function(data) {

                 STATE.userOrder[data._id]=data;
                 console.log('here is the data back:');
                 console.log(STATE.userOrder);
                 console.log(STATE.userOrder[data._id]._id);
                 currentObjectId=STATE.userOrder[data._id]._id;
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    // updateDish(){
    //
    //
    //
    //   this.updateOrder(weekArray, id);
    // }


    updateOrder(days, id) {

        var updatingOrder = {
             week:{
               days:days
             },
            _id: id
        };

        var ajax = $.ajax('/order', {
            type: 'PUT',
            data: JSON.stringify(updatingOrder),
            dataType: 'json',
            contentType: 'application/json',

            success: function(data) {

                console.log(data);
                console.log('UPDATED');
            },
            error: function(error) {
                console.log(error);
            }
        });


    }

}


//
//
//



class View {

  renderDay(dayObject){

  var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  var wS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];



  if(dayObject.day==thisDay ){

    $('.calendardiv ul').append('<li style="color:red "id='+dayObject.dateId+'>'+wS[dayObject.weekday]+'      '+mS[dayObject.month]+ '   ' +dayObject.day+ '</li>');
  }
 else {
     $('.calendardiv ul').append('<li id='+dayObject.dateId+'>'+wS[dayObject.weekday]+'      '+mS[dayObject.month]+ '   ' +dayObject.day+ '</li>');
 }


  }

    getCurrentArray(id){

              var ajax = $.ajax('/order/'+id, {

                  type: 'GET',

                  success: function(data) {
                      console.log(data);
                      console.log('DISPLAYING CURRENTARRAY');
                  },

                  error: function(error) {
                      console.log(error);
                  }
              });

    }

    clickDish(i, selectedDish) {

        for (i = 0; i < dishesArray.length; i++) {

            if (selectedDish == dishesArray[i].dishId) {

                return dishesArray[i];

            }
        }
    }

    addDish(currentSelectedDay, dish) {

        dishList.push(dish);

        this.displayDishList(selectedArray);

    }

    addRepeatedDish(currentDay, dish, i) {

        // selectedArray= weekArray[currentDay].orderArray[i].count;
        //
        //    selectedArray.orderArray[i].count.push(dish);

    }



    displayDishList(selectedArray) {


        var i = 0;
        $('.dayform li').remove();
        for (i = 0; i < selectedArray.length; i++) {

            $('.dayform ul').append('<li >' + selectedArray[i].name + '<input type="number" id=' + i + '  min="0" name="name" value=""></input>' + '<p id=' + i + '> delete </p></li>');
            $('.dayform ul').append();
        }
    }
}

var displayWeek = function(i, week) {

    $('.weekdiv ul').append("<li id=" + i + "><div class='weekslot' ><p>" + week + "</p></div></li>");

};

function arrangeArray() {

    var i = 0;
    var index = 0;

    for (index = 0; index < 8; index++) { // gonna do this 7 times

        for (i = 0; i < 7; i++) { // check every single object in array

            if (weekArray[i].position == index) { // and see if the position is [index]
                // this will assure that 1 goes first and so forth
                rearrangedArray.push(weekArray[i]);
            }
        }
        if (index == 7) {
            $('.weekslot').remove();
            weekArray = [];
            for (i = 0; i < 7; i++) {
                weekArray.push(rearrangedArray[i]);
                displayWeek(i, rearrangedArray[i].week);
            }
        }
    }
}

function displayFood(dishes) {

    $('.food-div').append("<div class='foodslot' id=" + dishes.dishId + "><div class='foodimage'  style='background-image:url(" + dishes.imageURL + "); background-size: 130px 120px'> </div> <label>" + dishes.name + "</label></div> ");

}




$(document).ready(function() {


    var newOrder = new Order();
    var newView = new View();
  var appUser = new User();
  var dishId;
  var currentDay;
  var i;

  // renders the calendar//
  //


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

        newView.renderDay(dayObject, i);
    }



// on click of days return a selectedDay

      $('.calendardiv ul').on('click', 'li', function(){
          console.log(renderingWeekArray);
    console.log(  this.id );
      for (i=0 ; i< renderingWeekArray.length ; i++) {
              if(this.id==renderingWeekArray[i].dateId){

                  currentSelectedDay= renderingWeekArray[i];
                  console.log(currentSelectedDay);
              }
      }

      });

    $.get('/dishes', (data) => { //  data is the json data responded //

        console.log(data);
        dishesArray = data;
        optionView();

    });





    function optionView() {

        for (i = 0; i < dishesArray.length; i++) {

            displayFood(dishesArray[i]);


        }

    }

    for (i = 0; i < 7; i++) {
        displayWeek(i, weekArray[i].week);

    }


    $('#arrow-right').click(function() {


        rearrangedArray = [];
        for (i = 0; i < 7; i++) {

            if (weekArray[i].position == 7) {
                weekArray[i].position = weekArray[i].position - 6;

            } else {
                weekArray[i].position = weekArray[i].position + 1;
            }

            if (i == 6) {

                arrangeArray();
            }


        } // end of for


    });


    $('#arrow-left').click(function() {


        rearrangedArray = [];

        for (i = 0; i < 7; i++) {

            if (weekArray[i].position == 1) {

                weekArray[i].position = weekArray[i].position + 6;

            } else {
                weekArray[i].position = weekArray[i].position - 1;
            }

            if (i == 6) {

                arrangeArray();
            }
        } // end of for

    });

    $('.weekdiv ul').on('click', 'li', function() {


        $('.dayform h1').text(weekArray[this.id].week);
        console.log(weekArray[this.id].orderArray);
        console.log(dishesArray);
        console.log(weekArray);
        // console.log(weekArray[this.id].orderArray);
        newView.displayDishList(weekArray[this.id].orderArray);

        $('.dayform').hide();

        $('.dayform').show();

        currentDay = this.id;


    });




    $('.food-div').on('click', '.foodslot', function() {

        var i = 0;
        var selectedDish = $(this)[0].id;

        var dish = newView.clickDish(i, selectedDish);


        console.log(dish);


        if ( currentObjectId ===null ) {

            console.log(dish);
            newOrder.postOrder( dish , currentSelectedDay);

        } else {
            console.log(STATE.userOrder);
              console.log('NODDASDSA');
            console.log('Updating....');
            newView.addDish(currentDay, dish);
            // newOrder.postOrder(weekArray[currentDay].week, week[currentDay] );
            newOrder.updateOrder(weekArray, currentObjectId);
            // console.log(currentObjectId);
            // newView.getCurrentArray(currentObjectId);
        }



    });

    // Adding or subtracting count

    $('.dayform ul').on('change', 'input', function() {


        //   weekArray[currentDay].orderArray[$(this)[0].id].count = $(this).val();
        // console.log(  weekArray[currentDay].orderArray[$(this)[0].id].count );
        //

    });
    // DELETING DISH .
    //


    $('.dayform ul').on('click', 'p', function() {

        // console.log($(this));
        // console.log(weekArray[currentDay].orderArray[$(this)[0].id]);
        var deletingArray = weekArray[currentDay].orderArray;

        deletingArray.splice($(this)[0].id, 1);
        console.log(deletingArray);

        newOrder.updateOrder(weekArray, currentObjectId);
        newView.displayDishList(weekArray[currentDay].orderArray);


    });




    //log in


    $('#giva-login-button').click(function() {
        event.preventDefault();
        console.log('clicked');
        appUser.logInUser();

    });


    $('#login-button').click(function() {

        console.log('clicked');

        window.location.href = "/home.html";


    });


    // sign up
    //

    //


    $('.signup-form').submit(function() {
        event.preventDefault();
        appUser.validatePassword();
    });



    $('.submit-button').click(function() {

        newOrder.postOrder(weekArray);
        console.log(weekArray);

    });





});
