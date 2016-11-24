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

var thisYear = new Date().getFullYear();
var thisMonth = new Date().getMonth();
var thisDay = new Date().getDate();
var thisWeekDay = new Date().getDay();
var weekChanger = -1;
var weekDays;
var renderingWeekArray = [];
var testingDate = new Date();
var testingDay = new Date(2016, 10, 21).getDate();
var testingWeekday = thisWeekDay;
var currentSelectedDay;
var dishList = [];
var index=0;


// 1 - 2 = 30 of OCtober



// when the user first sees the calendar,
// the person sees the week that day are in.







const STATE = {


    userOrder: {},
    orderObject: {}




};

class Order {

    postOrder(dish, currentSelectedDay) {

        var orderData = {
            date: currentSelectedDay.date,
            dish: dish,
            dateId: currentSelectedDay.dateId,
            price: dish.price
        };

        var ajax = $.ajax('/order', {
            type: 'POST',
            data: JSON.stringify(orderData),
            dataType: 'json',
            contentType: 'application/json',

            success: function(data) {

                STATE.userOrder[data._id] = data;
                console.log('here is the data back:');
                console.log(STATE.userOrder);
                console.log(STATE.userOrder[data._id]._id);
                currentObjectId = STATE.userOrder[data._id]._id;
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
//
//
//
//



function  getCurrentDishes(dayObject, dayObjectId) {

        console.log(dayObjectId);

        var dateId = dayObjectId;

        var ajax = $.ajax('/order/' + dateId, {

            type: 'GET',

            success: function(data) {

                renderDays(dayObject, data);
            },

            error: function(error) {
                console.log(error);
            }
        });
    }


function renderCalendar(index){
  
  console.log(index);
  if(index<7){

    testingDate.setDate(testingDate.getDate() + 1);

    console.log(testingDate);

    var dayObject = {

        date: new Date(testingDate.getFullYear(), testingDate.getMonth(), testingDate.getDate()),
        day: testingDate.getDate(),
        weekday: testingDate.getDay(),
        month: testingDate.getMonth(),
        year: testingDate.getFullYear(),
        dateId: testingDate.getDate() + '' + testingDate.getMonth() + '' + testingDate.getFullYear()
    };

    getCurrentDishes(dayObject, dayObject.dateId);

    renderingWeekArray.push(dayObject);


    if(renderingWeekArray[i].date==thisDay.date){

      console.log('is SAME DAY as TODAY');
      console.log(renderingWeekArray[i]);

    }

  }





  // 30 - 3 = 27 of Novermber

}

function renderDishes(dayObject, orderObject) {

    if (orderObject.length === 0) {


    } else {

        console.log(orderObject[0].dishes);

        for (i = 0; i < orderObject[0].dishes.length; i++) {

            $('#' + dayObject.dateId + '').append('<div class="insidediv"><img src=' + orderObject[0].dishes[i].dish.imageURL + '></img>' + '<p>' + orderObject[0].dishes[i].dish.name + '</p></div>');

        }
    }

    index++;
    console.log('at end:');
    console.log(index);
    renderCalendar(index);
}

function renderDays(dayObject, orderObject) {



    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    var wS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (dayObject.day == thisDay) {

        $('.calendardiv ul').append('<div class="render-food-list" style="color:#ffffcc" id=' + dayObject.dateId + '>  <div class="datesdiv" style="color:#ffffcc" id=' + dayObject.dateId + '>' + wS[dayObject.weekday] + '</br>' + mS[dayObject.month] + '</br>' + dayObject.day + '</br></div></div> ');
    } else {

        $('.calendardiv ul').append('<div class="render-food-list" id=' + dayObject.dateId + '> <div class="datesdiv "id=' + dayObject.dateId + '>' + wS[dayObject.weekday] + '</br>' + mS[dayObject.month] + '</br>' + dayObject.day + '</br></div></div>');

    }


    renderDishes(dayObject, orderObject);

}


class View {

    displaySelectedBorder(dateId){
      $('.render-food-list').css("border","2px solid black");
      $('#'+dateId+'').css("border", "2px solid yellow");
    }

    clickDish(i, selectedDish) {

        for (i = 0; i < dishesArray.length; i++) {

            if (selectedDish == dishesArray[i].dishId) {

                return dishesArray[i];

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

    testingDate.setDate(testingDate.getDate() - testingWeekday + weekChanger);
    // renders the calendar//
    //
    //
    //
    $.get('/dishes', (data) => { //  data is the json data responded //


        dishesArray = data;
        optionView();

    });

     index=0;

    renderCalendar(index);





//  to delete an item
  $('.calendardiv').on('click', '.insidediv', function(){

  });


    // on click of days return a selectedDay

    $('.calendardiv').on('click', '.datesdiv', function() {

        console.log(renderingWeekArray);
        console.log(this.id);


        for (i = 0; i < renderingWeekArray.length; i++) {
            if (this.id == renderingWeekArray[i].dateId) {
            currentSelectedDay = renderingWeekArray[i];
            console.log(currentSelectedDay);

            }
        }

    });

    //ADD DISHES BY CLIKCING //


    $('.food-div').on('click', '.foodslot', function() {

        var i = 0;
        var selectedDish = $(this)[0].id;

        var dish = newView.clickDish(i, selectedDish);

        console.log(dish);
        newOrder.postOrder(dish, currentSelectedDay);
        console.log(currentSelectedDay);

        $('#' + currentSelectedDay.dateId + '').append('<div class="insidediv"><img src=' + dish.imageURL + '></img>' + '<p>' +  dish.name + '</p></div>');

    });


    function optionView() {

        for (i = 0; i < dishesArray.length; i++) {
            displayFood(dishesArray[i]);
        }

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
