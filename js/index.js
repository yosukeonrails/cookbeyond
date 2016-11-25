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
var thisDayId= new Date().getDate() + '' +  new Date().getMonth() + '' +  new Date().getFullYear();
var thisDayObject;
var weekChanger = -1;
var weekDays;
var renderingWeekArray = [];
var testingDate = new Date();
var testingDay = new Date(2016, 10, 21).getDate();
var testingWeekday = thisWeekDay;
var currentSelectedDay = thisDayObject;
var dishList = [];
var index=0;


// 1 - 2 = 30 of OCtober



// when the user first sees the calendar,
// the person sees the week that day are in.







const STATE = {


    userOrder: {},
    orderObject: {},
    thisDayObject:{}


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



                var postedDish=data.dishes[data.dishes.length-1];

                console.log('here is the data back:');

                currentObjectId = STATE.userOrder[data._id]._id;

      $('#' + data.dateId + '').append('<div class="insidediv" id='+postedDish._id+'><img src=' + postedDish.dish.imageURL + '></img>' + '<p>' +  postedDish.dish.name + '</p></div>');

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

        var ajax = $.ajax('/order/date/' + dateId, {

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

    console.log(dayObject.dateId);
    console.log(thisDayId);


  }


}

  function deleteDish(orderObject, orderObjectId, orderObjectPrice){

        var deletedDish={
              // id:currentSelectedDay.dateId,
             id:orderObject[0]._id,
             dishId: orderObjectId,
             price:orderObjectPrice
        };

            $.ajax('/order', {
            type: 'DELETE',
            data: JSON.stringify(deletedDish),
            dataType: 'json',
            contentType: 'application/json',

            success: function(data) {

            },
            error: function(error) {
                console.log(error);
            }
        });

  }

function renderDishes(dayObject, orderObject) {


  console.log(orderObject);

    if (orderObject.length === 0) {


    } else {

        console.log(orderObject[0].dishes);

        for (i = 0; i < orderObject[0].dishes.length; i++) {

          var div='<div class="insidediv" id='+i+' value='+i+'><img src=' + orderObject[0].dishes[i].dish.imageURL + '></img>' + '<p>' + orderObject[0].dishes[i].dish.name + '</p></div>';
          div= $(div);

          div.click(  function(){


               var orderObjectId= orderObject[0].dishes[this.id]._id;
               var orderObjectPrice=orderObject[0].dishes[this.id].dish.price;

               console.log(orderObjectId); console.log(orderObjectPrice); console.log(orderObject[0]._id);
               deleteDish(orderObject , orderObjectId, orderObjectPrice);


          });
            $('#' + dayObject.dateId + '').append(div);

        }


    }

    index++;
    renderCalendar(index);
}

  function displaySelectedBorder(dateId){


    $( '.render-food-list').css("border", "1px solid #737373");
      $( '.render-food-list').css("height", "122px");
    $('#' + dateId + '').css("border", "3px solid #ff7733");
      $('#' + dateId + '').css("height", "126px");

  }


function renderDays(dayObject, orderObject) {



    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    var wS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (dayObject.day == thisDay) {

        $('.calendardiv ul').append('<div class="render-food-list" style="color:#737373" id=' + dayObject.dateId + '>  <div class="datesdiv" style="color:#ffffcc" id=' + dayObject.dateId + '>' + wS[dayObject.weekday] + '</br>' + mS[dayObject.month] + '</br>' + dayObject.day + '</br></div></div> ');
    } else {

        $('.calendardiv ul').append('<div class="render-food-list" id=' + dayObject.dateId + '> <div class="datesdiv "id=' + dayObject.dateId + '>' + wS[dayObject.weekday] + '</br>' + mS[dayObject.month] + '</br>' + dayObject.day + '</br></div></div>');

    }

    if(dayObject.dateId== thisDayId){

      console.log('is SAME DAY as TODAY');
      console.log(renderingWeekArray[i]);

      displaySelectedBorder(dayObject.dateId);

      thisDayObject=dayObject;

      console.log(thisDayObject);

    }


    renderDishes(dayObject, orderObject);

}


class View {



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
    console.log(this);
    console.log($(this).val());
    console.log(currentSelectedDay);


    // get request by id //
    //




  });


    // on click of days return a selectedDay

    $('.calendardiv').on('click', '.render-food-list', function() {

        console.log(renderingWeekArray);
        console.log(this.id);

        for (i = 0; i < renderingWeekArray.length; i++) {
            if (this.id == renderingWeekArray[i].dateId) {
            currentSelectedDay = renderingWeekArray[i];

            console.log(currentSelectedDay);

            }
        }

          displaySelectedBorder(this.id);

    });

    //ADD DISHES BY CLIKCING //


    $('.food-div').on('click', '.foodslot', function() {
      console.log(thisDayObject);
        var i = 0;

        var selectedDish = $(this)[0].id;

        var dish = newView.clickDish(i, selectedDish);

        console.log(dish);

      if(currentSelectedDay===undefined){

        newOrder.postOrder(dish, thisDayObject);

      }
        else {
            newOrder.postOrder(dish, currentSelectedDay);
        }



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
