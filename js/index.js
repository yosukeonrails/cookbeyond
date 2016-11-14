

var weekArray=[
  {week: 'Monday',
    position:1},

   {week:'Tuesday',
   position:2},

    {week:'Wednesday',
    position:3},

     {week:'Thursday',
      position:4},

      {week:'Friday',
       position:5},

     {week:'Saturday',
       position:6},

     {week:'Sunday',
       position:7}
];

var displayWeek= function(week){

  $('.weekdiv').append("<div class='weekslot'><p>"+week+"</p></div>");

};


$(document).ready(function(){

var i;
var rearrangedArray= [];

for(i=0; i<7; i++){

displayWeek(weekArray[i].week);

}



$('#arrow-right').click(function(){
  console.log('clicked');
  for(i=0; i<7; i++){


  if( weekArray[i].position==7){

      weekArray[i].position = weekArray[i].position-6 ;
    }
      else {
        weekArray[i].position = weekArray[i].position+1;
      }
 }

  for (i=0; i<7; i++) {

     


  }



});


$('#arrow-left').click(function(){

  for(i=0; i<7; i++){

  if( weekArray[i].position==1){

      weekArray[i].position = weekArray[i].position+6 ;
    }
      else {
        weekArray[i].position = weekArray[i].position-1;
      }

 }




});








});
