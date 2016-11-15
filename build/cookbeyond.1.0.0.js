/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var weekArray = [{
	    week: 'Monday',
	    position: 1,
	    breakfast: null,
	    breakfastData: null,
	    lunch: null,
	    lunchData: null,
	    dinner: null,
	    dinnerData: null
	
	}, {
	    week: 'Tuesday',
	    position: 2,
	    breakfast: null,
	    breakfastData: null,
	    lunch: null,
	    lunchData: null,
	    dinner: null,
	    dinnerData: null
	}, {
	    week: 'Wednesday',
	    position: 3,
	    breakfast: null,
	    breakfastData: null,
	    lunch: null,
	    lunchData: null,
	    dinner: null,
	    dinnerData: null
	}, {
	    week: 'Thursday',
	    position: 4,
	    breakfast: null,
	    breakfastData: null,
	    lunch: null,
	    lunchData: null,
	    dinner: null,
	    dinnerData: null
	}, {
	    week: 'Friday',
	    position: 5,
	    breakfast: null,
	    breakfastData: null,
	    lunch: null,
	    lunchData: null,
	    dinner: null,
	    dinnerData: null
	}, {
	    week: 'Saturday',
	    position: 6,
	    breakfast: null,
	    breakfastData: null,
	    lunch: null,
	    lunchData: null,
	    dinner: null,
	    dinnerData: null
	}, {
	    week: 'Sunday',
	    position: 7,
	    breakfast: null,
	    breakfastData: null,
	    lunch: null,
	    lunchData: null,
	    dinner: null,
	    dinnerData: null
	}];
	
	var dishesArray = [{
	    name: 'Japanese Curry',
	    imageURL: 'http://tastykitchen.com/recipes/wp-content/uploads/sites/2/2010/06/Japanese-Curry.jpg'
	}, {
	    name: 'Tomatoe Soup',
	    imageURL: 'https://measuringcupcuisine.files.wordpress.com/2012/08/123-edit.jpg'
	}, {
	    name: 'Spaguetti',
	    imageURL: 'http://www.mnftiu.cc/wp-content/uploads/2013/12/spaghetti-with-tomato-sauce.jpg'
	}, {
	    name: 'Burrito',
	    imageURL: 'http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2015/8/26/2/WU0811H_Grilled-Veggie-Burritos_s4x3.jpg'
	}, {
	    name: 'Salmon',
	    imageURL: 'http://www.wonderwardrobes.com/wp-content/uploads/2015/07/salmon.jpg'
	}];
	
	var rearrangedArray = [];
	
	var displayWeek = function displayWeek(i, week) {
	
	    $('.weekdiv ul').append("<li id=" + i + "><div class='weekslot' ><p>" + week + "</p></div></li>");
	};
	
	function arrangeArray() {
	
	    var i = 0;
	    var index = 0;
	
	    for (index = 0; index < 8; index++) {
	        // gonna do this 7 times
	
	        for (i = 0; i < 7; i++) {
	            // check every single object in array
	
	            if (weekArray[i].position == index) {
	                // and see if the position is [index]
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
	
	$(document).ready(function () {
	
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
	
	    $('#arrow-right').click(function () {
	
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
	
	    $('#arrow-left').click(function () {
	
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
	
	    $('ul').on('click', 'li', function () {
	
	        console.log(this.id);
	        console.log(weekArray[this.id]); // makes the dayObject
	        $('.dayform h1').text(weekArray[this.id].week);
	
	        $('.breakfast').val(weekArray[this.id].breakfast);
	
	        $('.lunch').val(weekArray[this.id].lunch);
	
	        $('.dinner').val(weekArray[this.id].dinner);
	
	        $('.dayform').hide();
	        $('.dayform').show();
	
	        currentDay = this.id;
	    });
	
	    $('.dayform select').click().change(function () {
	
	        var breakfastDish = $('.breakfast option:selected').val();
	        var lunchDish = $('.lunch option:selected').val();
	        var dinnerDish = $('.dinner option:selected').val();
	
	        weekArray[currentDay].breakfast = breakfastDish;
	        weekArray[currentDay].lunch = lunchDish;
	        weekArray[currentDay].dinner = dinnerDish;
	
	        console.log(weekArray[currentDay]);
	        console.log(weekArray);
	    });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=cookbeyond.1.0.0.js.map