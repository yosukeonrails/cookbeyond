var $ = require('jquery');
var events = require('events');
var myEmitter = new events.EventEmitter();
import User from './users.js';
import View from './view.js';
var weekArray = require('./weekarray.js');
var dishesArray = [];
var rearrangedArray = [];
var data;


class Order {

    postOrder(dishesArray) {

        // handle post request



        var ajax = $.ajax('/order', {
              type:'POST',
              data:JSON.stringify(dishesArray),
              dataType:'json',
              contentType: 'application/json',

              success:function(data){
                console.log(data.week);
              },
              error: function(error){
                console.log(error);
              }
        });
    }



}


//

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

    $('.food-div').append("<div class='foodslot' id="+dishes.dishId+"><div class='foodimage'  style='background-image:url(" + dishes.imageURL + "); background-size: 130px 120px'> </div> <label>" + dishes.name + "</label></div> ");

}




$(document).ready(function() {

     var newOrder= new Order();


    $.get('/dishes', (data) => { //  data is the json data responded //

        console.log(data);
        dishesArray = data;
        optionView();

    });


    console.log('somgthing here');

    var appView = new View();
    var appUser = new User();

    var dishId;
    var currentDay;
    var i;


    function optionView() {

        for (i = 0; i < dishesArray.length; i++) {

            displayFood(dishesArray[i]);

            $('.breakfast').append("<option value=" + i + " id=" + i + ">" + dishesArray[i].name + "</option>");
            $('.lunch').append("<option value=" + i + " id=" + i + ">" + dishesArray[i].name + "</option>");
            $('.dinner').append("<option value=" + i + " id=" + i + ">" + dishesArray[i].name + "</option>");
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

    $('ul').on('click', 'li', function() {


        $('.dayform h1').text(weekArray[this.id].week);


        //
        console.log(weekArray[this.id].breakfast);
        //
        $('.breakfast').val(weekArray[this.id].breakfast);

        console.log(weekArray[this.id].lunch);

        $('.lunch').val(weekArray[this.id].lunch);

        console.log(weekArray[this.id].dinner);

        $('.dinner').val(weekArray[this.id].dinner);




        $('.dayform').hide();
        $('.dayform').show();

        currentDay = this.id;

    });


    $('.food-div').on('click', '.foodslot', function(){


      var selectedDish= $(this)[0].id;

            for(i=0; i<dishesArray.length; i++){
                 if(selectedDish==dishesArray[i].dishId){
                   console.log(dishesArray[i]);

                 }else {

                 }
               }


    });


    $('.dayform select').click(function() {

        console.log($('.breakfast option:selected').text());

        var breakfastId = $('.breakfast option:selected').val();
        var lunchId = $('.lunch option:selected').val();
        var dinnerId = $('.dinner option:selected').val();


        weekArray[currentDay].breakfastData = dishesArray[breakfastId];
        weekArray[currentDay].lunchData = dishesArray[lunchId];
        weekArray[currentDay].dinnerData = dishesArray[dinnerId];

        weekArray[currentDay].breakfast = $('.breakfast option:selected').text();
        weekArray[currentDay].lunch = $('.lunch option:selected').text();
        weekArray[currentDay].dinner = $('.dinner option:selected').text();



        console.log(weekArray[currentDay]);
        console.log(weekArray);


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
