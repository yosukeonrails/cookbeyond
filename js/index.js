var weekArray = [

    {
        week: 'Monday',
        position: 1
    },

    {
        week: 'Tuesday',
        position: 2
    },

    {
        week: 'Wednesday',
        position: 3
    },

    {
        week: 'Thursday',
        position: 4
    },

    {
        week: 'Friday',
        position: 5
    },

    {
        week: 'Saturday',
        position: 6
    },

    {
        week: 'Sunday',
        position: 7
    }
];

var rearrangedArray = [];

var displayWeek = function(week) {

    $('.weekdiv').append("<div class='weekslot'><p>" + week + "</p></div>");

};



$(document).ready(function() {

    var i;

    var index = 0;



    for (i = 0; i < 7; i++) {


        displayWeek(weekArray[i].week);

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

                for (index = 0; index < 8; index++) {
                    for (i = 0; i < 7; i++) {

                        if (weekArray[i].position == index) {

                            rearrangedArray.push(weekArray[i]);

                        }
                    }

                    if (index == 7) {
                        $('.weekslot').remove();
                        for (i = 0; i < 7; i++) {

                            displayWeek(rearrangedArray[i].week);

                        }
                    }
                }

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

                for (index = 0; index < 8; index++) {

                    for (i = 0; i < 7; i++) {

                        if (weekArray[i].position == index) {

                            rearrangedArray.push(weekArray[i]);

                            // $('.weekslot').remove();
                            // displayWeek(rearrangedArray[i].week);
                        }
                    }

                    if (index == 7) {
                        $('.weekslot').remove();
                        for (i = 0; i < 7; i++) {

                            displayWeek(rearrangedArray[i].week);

                        }
                    }
                }

            }


        } // end of for


    });






});
