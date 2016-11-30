var $ = require('jquery');
var events = require('events');
var myEmitter = new events.EventEmitter();
import User from './users.js';
import Countries from './countries.js';
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
var thisFullDay = new Date();
var thisYear = new Date().getFullYear();
var thisMonth = new Date().getMonth();
var thisDay = new Date().getDate();
var thisWeekDay = new Date().getDay();
var thisDayId = new Date().getDate() + '' + new Date().getMonth() + '' + new Date().getFullYear();
var thisDayObject;

var weekDays;
var renderingWeekArray = [];
var testingDate = new Date();
var testingWeekday = thisWeekDay;
var weekChanger = -1;
var currentSelectedDay = thisDayObject;
var dishList = [];
var index = 0;
var deleteIndex;
var titleDate;
var titleSelector;
var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var wS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];



const STATE = {

    userOrder: {},
    orderObject: {},
    thisDayObject: {}
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

                var divId = (data.dishes.length - 1);

                var postedDish = data.dishes[data.dishes.length - 1];
                var orderId = data._id;


                currentObjectId = STATE.userOrder[data._id]._id;
                var currentDay = currentSelectedDay.dateId;

                deleteDishView(postedDish, orderId, currentDay);


            },
            error: function(error) {
                console.log(error);
            }
        });
    }
}


function titleWeek(titleSelector, testingDate) {

    if (testingDate.getDate() > 3) {
        titleDate = testingDate.getDate() + 'th';
    }
    if (testingDate.getDate() == 1) {
        titleDate = testingDate.getDate() + 'st';
    }
    if (testingDate.getDate() == 2) {
        titleDate = testingDate.getDate() + 'nd';
    }
    if (testingDate.getDate() == 3) {
        titleDate = testingDate.getDate() + 'rd';
    }

    $(titleSelector).text(wS[testingDate.getDay()] + ' , ' + mS[testingDate.getMonth()] + ' ' + titleDate + ',  ' + testingDate.getFullYear());


}

function renderCalendar(index) {

    if (index == 1) {

        titleSelector = $('.begin-week h1');

        titleWeek(titleSelector, testingDate);

    }

    if (index == 7) {
        titleSelector = $('.end-week h1');

        titleWeek(titleSelector, testingDate);
    }

    if (index < 7) {

        testingDate.setDate(testingDate.getDate() + 1);

        var dayObject = {
            date: new Date(testingDate.getFullYear(), testingDate.getMonth(), testingDate.getDate()),
            day: testingDate.getDate(),
            weekday: testingDate.getDay(),
            month: testingDate.getMonth(),
            year: testingDate.getFullYear(),
            dateId: testingDate.getDate() + '' + testingDate.getMonth() + '' + testingDate.getFullYear()
        };

        renderDays(dayObject);
        renderingWeekArray.push(dayObject);

    }
}




function renderDays(dayObject) {


    if (dayObject.day == thisDay) {

        $('.calendardiv ul').append('<div class="render-food-list" style="color:#737373" id=' + dayObject.dateId + '>  <div class="datesdiv" style="color:#ffffcc" id=' + dayObject.dateId + '>' + wS[dayObject.weekday] + '</br>' + mS[dayObject.month] + '</br>' + dayObject.day + '</br></div></div> ');
    } else {

        $('.calendardiv ul').append('<div class="render-food-list" id=' + dayObject.dateId + '> <div class="datesdiv "id=' + dayObject.dateId + '>' + wS[dayObject.weekday] + '</br>' + mS[dayObject.month] + '</br>' + dayObject.day + '</br></div></div>');

    }

    if (dayObject.dateId == thisDayId) {

        displaySelectedBorder(dayObject.dateId);

        thisDayObject = dayObject;

    }
    getCurrentDishes(dayObject, dayObject.dateId);

}

function getCurrentDishes(dayObject, dayObjectId) {

    var dateId = dayObjectId;

    var ajax = $.ajax('/order/date/' + dateId, {

        type: 'GET',

        success: function(data) {

            renderDishes(dayObject, data);


        },
        error: function(error) {
            console.log(error);


        }

    });
}


function renderDishes(dayObject, orderObject) {

    if (orderObject.length === 0) {


        index++;
        renderCalendar(index);

    } else {


        for (i = 0; i < orderObject[0].dishes.length; i++) {

            var currentDay = dayObject.dateId;


            deleteDishView(orderObject[0].dishes[i], orderObject[0]._id, currentDay);
        }

        index++;
        renderCalendar(index);
    }

}




function deleteDishView(postedDish, orderId, currentDay) {

    var appended = '<div class="insidediv"><img src=' + postedDish.dish.imageURL + '></img>' + '<p>' + postedDish.dish.name + '</p></div>';
    appended = $(appended);

    var deleteX = '<i class="fa fa-times-circle-o"  aria-hidden="true"></i>';

    deleteX = $(deleteX);


    deleteX.click(function() {


        appended.remove();
        (deleteX).remove();

        var orderDishId = postedDish._id;
        var orderPrice = postedDish.dish.price;


        deleteDish(orderId, orderDishId, orderPrice);

    });

    $('#' + currentDay + '').append(appended);
    $('#' + currentDay + '').append(deleteX);

}

function deleteDish(orderId, orderDishId, orderPrice) {

    var deletedDish = {
        // id:currentSelectedDay.dateId,
        id: orderId,
        dishId: orderDishId,
        price: orderPrice
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

function displaySelectedBorder(dateId) {


    $('.render-food-list').css("border", "1px solid #737373");
    $('.render-food-list').css("background-color", "#dbdbe0");
    $('.render-food-list').css("opacity", "0.7");

    $('#' + dateId + '').css("opacity", "1");
    $('#' + dateId + '').css("background-color", "#d8d8da");
    $('#' + dateId + '').css("border", "1px solid #ff7733");


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

function getAllDishes() {
    var ajax = $.ajax('/dishes', {
        type: 'GET',

        success: function(data) {
            console.log(data);
            dishesArray = data;
            optionView(dishesArray);

        },
        error: function(error) {
            console.log(error);
        }
    });
}

function optionView(dishesArray) {
      console.log(dishesArray);
    for (i = 0; i < dishesArray.length; i++) {
        displayFood(dishesArray[i]);
        console.log(dishesArray[0]);
    }
}


function displayFood(dishes) {
      console.log(dishes);
    $('.food-div').append("<div class='foodslot' id=" + dishes.dishId + "><div class='foodimage'  style='background-image:url(" + dishes.imageURL + "); background-size: 130px 120px'> </div> <label>" + dishes.name + "</label></div> ");

}


function loadCalendar(index, weekChanger, testingDate, testingWeekday) {

    $('.render-food-list').remove();

    testingDate.setDate(testingDate.getDate() - testingWeekday + weekChanger);
    // 28 - 1(todays weekday which is monday)-1

    index = 0;

    renderCalendar(index);

}


$(document).ready(function() {


    var newOrder = new Order();
    var newView = new View();
    var appUser = new User();
    var dishId;
    var currentDay;
    var i;

    getUser();

    console.log('is it logging 2?');


    for (i = 0; i < wS.length; i++) {
        var newI = -(i - thisWeekDay);
        $('.week-starter-select').append('<option id=' + newI + '>' + wS[i] + '</option>');
    }


    $('.week-starter-select').change(function() {

        $('.week-starter-select option:selected').each(function() {

            testingWeekday = this.id;
            index = 0;
            testingDate = new Date();

            loadCalendar(index, weekChanger, testingDate, testingWeekday);
            //-1          //29           // 0
        });
        // here we change the testingWeekday
    });

    // render calendar

    loadCalendar(index, weekChanger, testingDate, testingWeekday);

    // $.get('/dishes', (data) => { //  data is the json data responded //
    //     dishesArray = data;
    //     optionView();
    // });

    getAllDishes();



    // move calendar by 1 week //

    $('#next-week, .fa.fa-arrow-circle-o-right').click(function() {


        testingDate = new Date();

        weekChanger = weekChanger + 7;
        index = 0;

        loadCalendar(index, weekChanger, testingDate, testingWeekday);

    });


    $('#previous-week, .fa.fa-arrow-circle-o-left').click(function() {

        testingDate = new Date();
        weekChanger = weekChanger - 7;
        index = 0;


        loadCalendar(index, weekChanger, testingDate, testingWeekday);


    });

    // select the day you want the dish to go to//

    $('.calendardiv').on('click', '.render-food-list', function() {

        for (i = 0; i < renderingWeekArray.length; i++) {
            if (this.id == renderingWeekArray[i].dateId) {
                currentSelectedDay = renderingWeekArray[i];
            }
        }

        displaySelectedBorder(this.id);

    });

    //ADD DISHES BY CLIKCING //

    $('.food-div').on('click', '.foodslot', function() {

        var i = 0;

        var selectedDish = $(this)[0].id;

        var dish = newView.clickDish(i, selectedDish);


        if (currentSelectedDay === undefined) {

            newOrder.postOrder(dish, thisDayObject);

        } else {
            newOrder.postOrder(dish, currentSelectedDay);
        }

    });


    // render the list of food




    //log in

    $('#giva-login-button').click(function() {
        event.preventDefault();

        appUser.logInUser();

    });


    $('#login-button').click(function() {


        window.location.href = "/home.html";

    });

    function getUser() {

        var ajax = $.ajax('/user', {

            type: 'GET',

            success: function(data) {



            },
            error: function(error) {
                console.log(error);

            }

        });

    }


    // sign up

    $('.signup-form').submit(function() {
        event.preventDefault();
        appUser.validatePassword();
    });



    $('.submit-button').click(function() {

        newOrder.postOrder(weekArray);


    });

    // log out

    $('.logout-navbar,.fa.fa-sign-out').click(function() {


        var ajax = $.ajax('/logout', {

            type: 'GET',

            success: function(data) {

                window.location = '/login.html';
            },
            error: function(error) {
                console.log(error);

            }

        });


    });

    /// mydish.html

    var myDishSpicy;

    for (i = 1; i < 5; i++) {

        $('.mydish-spicy').append('<option id=' + i + '>' + i + '</option>');
    }

    $('.mydish-spicy').change(function() {

        myDishSpicy = $('.mydish-form option:selected').val();

        console.log('testing');
        console.log(myDishSpicy);

    });




    $('.mydish-form').submit(function() {

        event.preventDefault();

        console.log('SUbmitted');
        
        console.log(myDishSpicy);

        var myDishName = $('.mydish-name').val();
        var myDishId = $('.mydish-dishId').val();
        var myDishImageURL = $('.mydish-imageURL').val();
        var myDishPrice = $('.mydish-price').val();
        var myDishCountry = $('.mydish-country').val();

        console.log(myDishImageURL);

        var myDishInfo = {
            country: myDishCountry,
            spicy: myDishSpicy
        };

        var myDishData = {
            name: myDishName,
            dishId: myDishId,
            imageURL:myDishImageURL,
            dishInfo:myDishInfo,
            price: myDishPrice,
            date: thisFullDay
        };

        var ajax = $.ajax('/mydish', {

            type: 'POST',
            data: JSON.stringify(myDishData),
            dataType: 'json',
            contentType: 'application/json',

            success: function(data) {

                console.log('dish was created');
            },

            error: function(error) {
                console.log(error);

            }


        });

    });




}); // end of document ready//
