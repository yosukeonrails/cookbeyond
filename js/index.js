var weekArray = [

    {
        week: 'Monday',
        position: 1,
        breakfast:null,
        lunch:null,
        dinner:null
    },

    {
        week: 'Tuesday',
        position: 2,
        breakfast:null,
        lunch:null,
        dinner:null
    },

    {
        week: 'Wednesday',
        position: 3,
        breakfast:null,
        lunch:null,
        dinner:null
    },

    {
        week: 'Thursday',
        position: 4,
        breakfast:null,
        lunch:null,
        dinner:null
    },

    {
        week: 'Friday',
        position: 5,
        breakfast:null,
        lunch:null,
        dinner:null
    },

    {
        week: 'Saturday',
        position: 6,
        breakfast:null,
        lunch:null,
        dinner:null
    },

    {
        week: 'Sunday',
        position: 7,
        breakfast:null,
        lunch:null,
        dinner:null
    }
];


var dishesArray = [{
    name: 'Japanese Curry',
    imageURL: 'http://tastykitchen.com/recipes/wp-content/uploads/sites/2/2010/06/Japanese-Curry.jpg',
}, {
    name: 'Tomatoe Soup',
    imageURL: 'https://measuringcupcuisine.files.wordpress.com/2012/08/123-edit.jpg',
}, {
    name: 'Spaguetti',
    imageURL: 'http://www.mnftiu.cc/wp-content/uploads/2013/12/spaghetti-with-tomato-sauce.jpg',
}, {
    name: 'Burrito',
    imageURL: 'http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2015/8/26/2/WU0811H_Grilled-Veggie-Burritos_s4x3.jpg',
}, {
    name: 'Salmon',
    imageURL: 'http://www.wonderwardrobes.com/wp-content/uploads/2015/07/salmon.jpg',
}];

var rearrangedArray = [];

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

    $('.food-div').append("<div class='foodslot'><div class='foodimage' style='background-image:url(" + dishes.imageURL + "); background-size: 130px 120px'> </div> <label>" + dishes.name + "</label></div> ");

}




$(document).ready(function() {

    var currentDay;
    var i;
    for (i = 0; i < dishesArray.length; i++) {
        console.log(dishesArray[i]);
        displayFood(dishesArray[i]);

        $('.breakfast').append("<option value=" + dishesArray[i].name + ">" + dishesArray[i].name + "</option>");
        $('.lunch').append("<option value=" + dishesArray[i].name + ">" + dishesArray[i].name + "</option>");
        $('.dinner').append("<option value=" + dishesArray[i].name + ">" + dishesArray[i].name + "</option>");
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

        console.log(this.id);
        console.log(weekArray[this.id]); // makes the dayObject
        $('.dayform h1').text(weekArray[this.id].week);

        $('.dayform').hide();
        $('.dayform').show();

        currentDay = this.id;

    });

    $('.dayform select').click().change(function() {


        var breakfastDish = $('.breakfast option:selected').val();
        var lunchDish = $('.lunch option:selected').val();
        var dinnerDish = $('.dinner option:selected').val();


      weekArray[currentDay].breakfast=breakfastDish;
      weekArray[currentDay].lunch=lunchDish;
      weekArray[currentDay].dinner=dinnerDish;

        console.log(weekArray[currentDay]);
        console.log(weekArray);


    });




});
