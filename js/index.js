var $ = require('jquery');
var events = require('events');
var myEmitter = new events.EventEmitter();
import User from './users.js';
var weekArray = require('./weekarray.js');
var dishesArray = [];
var rearrangedArray = [];
var selectedArray=[];
var data;
var currentObjectId=null;
var i=0;
 var repeatedArray=[];

class Order {

    postOrder(dishesArray) {

        var ajax = $.ajax('/order', {
            type: 'POST',
            data: JSON.stringify(dishesArray),
            dataType: 'json',
            contentType: 'application/json',

            success: function(data) {

           currentObjectId = data._id;

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


    updateOrder(weekArray, id){

        //take id to find the id in post ,
        // update it by posting back the weekArray
        var updatingOrder= {
           week:weekArray,
           _id:id
        };

        var ajax = $.ajax('/order', {
            type: 'PUT',
            data: JSON.stringify(updatingOrder),
            dataType: 'json',
            contentType: 'application/json',

            success: function(data) {


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



class View{


  clickDish(i,selectedDish) {
      for (i = 0; i < dishesArray.length; i++) {

          if (selectedDish == dishesArray[i].dishId) {

              return dishesArray[i];

          }
      }
  }

  addDish(currentDay,dish){

    console.log(selectedArray);

    console.log(weekArray);

    selectedArray= weekArray[currentDay].orderArray;


    selectedArray.push(dish);

    this.displayDishList(selectedArray);



  }

addRepeatedDish(currentDay,dish,i){

  // selectedArray= weekArray[currentDay].orderArray[i].count;
  //
  //    selectedArray.orderArray[i].count.push(dish);

  }



  displayDishList(selectedArray){


   var i=0;
     $('.dayform li').remove();
    for(i=0; i<selectedArray.length; i++){

        $('.dayform ul').append('<li >'+selectedArray[i].name+'<input type="number" id='+i+'  min="0" name="name" value=""></input>'+'<p id='+i+'> delete </p></li>');
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
    var newView= new View();

    $.get('/dishes', (data) => { //  data is the json data responded //

        console.log(data);
        dishesArray = data;
        optionView();

    });


    console.log('somgthing here');

    var appUser = new User();

    var dishId;
    var currentDay;
    var i;


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

        currentDay=this.id;


    });




    $('.food-div').on('click', '.foodslot', function() {

          var i=0;
          var selectedDish = $(this)[0].id;

           var dish=  newView.clickDish(i, selectedDish);

            console.log(dish);
             //
            //  for(i=0 ; i< weekArray[currentDay].orderArray.length; i++) {
            //     // if the meals is in the day //
             //
            //       if( dish == weekArray[currentDay].orderArray[i] ){ // first check if its repeated
             //
             //
            //           weekArray[currentDay].orderArray[i].count++;
             //
            //           return;
            //       }
            //  }
             if(currentObjectId===null){

              newView.addDish(currentDay, dish);

               newOrder.postOrder(weekArray);

             } else {
                console.log('Updating....');
                newView.addDish(currentDay, dish);
                newOrder.updateOrder(weekArray,currentObjectId);

             }




    });

    // Adding or subtracting count

    $('.dayform ul').on('change','input', function(){


      //   weekArray[currentDay].orderArray[$(this)[0].id].count = $(this).val();
      // console.log(  weekArray[currentDay].orderArray[$(this)[0].id].count );
      //

    });
    // DELETING DISH .
    //


    $('.dayform ul').on('click', 'p', function(){

          // console.log($(this));
          // console.log(weekArray[currentDay].orderArray[$(this)[0].id]);
          var deletingArray= weekArray[currentDay].orderArray;

          deletingArray.splice($(this)[0].id, 1);
            console.log(deletingArray);

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
