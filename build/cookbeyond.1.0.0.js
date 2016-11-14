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
	
	var weekArray = [{ week: 'Monday',
	  position: 1 }, { week: 'Tuesday',
	  position: 2 }, { week: 'Wednesday',
	  position: 3 }, { week: 'Thursday',
	  position: 4 }, { week: 'Friday',
	  position: 5 }, { week: 'Saturday',
	  position: 6 }, { week: 'Sunday',
	  position: 7 }];
	
	var displayWeek = function displayWeek(week) {
	
	  $('.weekdiv').append("<div class='weekslot'><p>" + week + "</p></div>");
	};
	
	$(document).ready(function () {
	
	  var i;
	  var rearrangedArray = [];
	
	  for (i = 0; i < 7; i++) {
	
	    displayWeek(weekArray[i].week);
	  }
	
	  $('#arrow-right').click(function () {
	    console.log('clicked');
	    for (i = 0; i < 7; i++) {
	
	      if (weekArray[i].position == 7) {
	
	        weekArray[i].position = weekArray[i].position - 6;
	      } else {
	        weekArray[i].position = weekArray[i].position + 1;
	      }
	    }
	
	    for (i = 0; i < 7; i++) {}
	  });
	
	  $('#arrow-left').click(function () {
	
	    for (i = 0; i < 7; i++) {
	
	      if (weekArray[i].position == 1) {
	
	        weekArray[i].position = weekArray[i].position + 6;
	      } else {
	        weekArray[i].position = weekArray[i].position - 1;
	      }
	    }
	  });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=cookbeyond.1.0.0.js.map