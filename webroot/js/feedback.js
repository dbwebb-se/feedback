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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _app = __webpack_require__(1);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Main to start all up.
	 */
	function main() {
	  "use strict";
	
	  var app = (0, _app2.default)();
	
	  app.init();
	  m.mount(document.body, app.widgets);
	} /**
	   * Main program, to start all up.
	   */
	
	
	window.addEventListener("load", main, false);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    "use strict";
	
	    // Classes
	
	    var Courses = Array;
	    var Teachers = Array;
	
	    // All courses
	    var courses = m.prop([]);
	    var coursesAsOptions = {};
	    var kmomsAsOptions = {
	        "kmom01": "kmom01",
	        "kmom02": "kmom02",
	        "kmom03": "kmom03",
	        "kmom04": "kmom04",
	        "kmom05": "kmom05",
	        "kmom06": "kmom06",
	        "kmom10": "kmom10"
	    };
	
	    // All teachers
	    var teachers = m.prop([]);
	    var teachersAsOptions = {};
	
	    /**
	     * Load assets and init app
	     */
	    function init() {
	        console.log("Init");
	
	        // Read info about all courses
	        m.request({
	            method: "GET",
	            url: "../json/courses.json",
	            unwrapSuccess: function unwrapSuccess(response) {
	                var courseList = new Courses();
	                for (var name in response) {
	                    courseList.push(new _course2.default(name, response[name]));
	                    coursesAsOptions[name] = name;
	                }
	                return courseList;
	            }
	        }).then(courses);
	
	        // Read info about all teachers
	        m.request({
	            method: "GET",
	            url: "../json/teachers.json",
	            unwrapSuccess: function unwrapSuccess(response) {
	                var teacherList = new Teachers();
	                for (var name in response) {
	                    teacherList.push(new _teacher2.default(name, response[name]));
	                    teachersAsOptions[name] = name;
	                }
	                return teacherList;
	            }
	        }).then(teachers);
	    }
	
	    /**
	     * All widgets
	     */
	    var widgets = {
	        controller: function controller(opts) {
	            console.log("Widgets controller");
	
	            this.selectCourses = new _select.UISelect.controller({
	                caption: "Välj kurs...",
	                options: coursesAsOptions
	            });
	
	            this.selectKmoms = new _select.UISelect.controller({
	                caption: "Välj kmom...",
	                options: kmomsAsOptions
	            });
	
	            this.selectTeacher = new _select.UISelect.controller({
	                caption: "Välj rättare...",
	                options: teachersAsOptions
	            });
	
	            //return this;
	        },
	
	        view: function view(ctrl) {
	            console.log("Widgets view");
	
	            return [new _select.UISelect.view(ctrl.selectCourses), new _select.UISelect.view(ctrl.selectKmoms), new _select.UISelect.view(ctrl.selectTeacher)];
	        }
	    };
	
	    /**
	     * Export these.
	     */
	    return {
	        "init": init,
	        "widgets": widgets
	    };
	};
	
	var _select = __webpack_require__(2);
	
	var _course = __webpack_require__(3);
	
	var _course2 = _interopRequireDefault(_course);
	
	var _teacher = __webpack_require__(4);
	
	var _teacher2 = _interopRequireDefault(_teacher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module for form select option list
	 */
	var UISelect = {
	    controller: function controller(data) {
	        this.classes = data.classes || '';
	        this.value = m.prop(data.value);
	        this.caption = data.caption;
	        this.options = data.options || {};
	        //return this;
	    },
	
	    view: function view(ctrl) {
	        var option = function option(key) {
	            return m('option', { value: key }, ctrl.options[key]);
	        };
	
	        var caption = "";
	        if (ctrl.caption) {
	            caption = m('option', {
	                value: "",
	                selected: "selected",
	                disabled: "disabled"
	            }, ctrl.caption);
	        }
	
	        return [m("select", {
	            "onchange": m.withAttr("value", ctrl.value),
	            "value": ctrl.value(),
	            "class": ctrl.classes
	        }, [caption, Object.keys(ctrl.options).map(option)])];
	    }
	};
	
	exports.UISelect = UISelect;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Course.
	 */
	
	var Course = function Course(name, element) {
	    _classCallCheck(this, Course);
	
	    console.log("Create course" + name);
	    this.name = m.prop(name);
	    this.kmoms = m.prop(element.kmoms);
	};
	
	exports.default = Course;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Course.
	 */
	
	var Teacher = function Teacher(name, element) {
	    _classCallCheck(this, Teacher);
	
	    console.log("Create teacher" + name);
	    this.name = m.prop(name);
	    this.mail = m.prop(element.mail);
	    this.chat = m.prop(element.chat || null);
	};
	
	exports.default = Teacher;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzNiMGVkMjBmNDMwODUzMGE0ODkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50L2Zvcm0vc2VsZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2RlbC9jb3Vyc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZGVsL3RlYWNoZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ25DQTs7Ozs7Ozs7O0FBT0EsVUFBUyxJQUFULEdBQWdCO0FBQ1o7O0FBRUEsT0FBSSxNQUFNLG9CQUFWOztBQUVBLE9BQUksSUFBSjtBQUNBLEtBQUUsS0FBRixDQUFRLFNBQVMsSUFBakIsRUFBdUIsSUFBSSxPQUEzQjtBQUNILEU7Ozs7O0FBRUQsUUFBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxJQUFoQyxFQUFzQyxLQUF0QyxFOzs7Ozs7Ozs7Ozs7bUJDUGUsWUFBVztBQUN0Qjs7OztBQUdBLFNBQUksVUFBVSxLQUFkO0FBQ0EsU0FBSSxXQUFXLEtBQWY7OztBQUdBLFNBQUksVUFBc0IsRUFBRSxJQUFGLENBQU8sRUFBUCxDQUExQjtBQUNBLFNBQUksbUJBQXNCLEVBQTFCO0FBQ0EsU0FBSSxpQkFBc0I7QUFDdEIsbUJBQVUsUUFEWTtBQUV0QixtQkFBVSxRQUZZO0FBR3RCLG1CQUFVLFFBSFk7QUFJdEIsbUJBQVUsUUFKWTtBQUt0QixtQkFBVSxRQUxZO0FBTXRCLG1CQUFVLFFBTlk7QUFPdEIsbUJBQVU7QUFQWSxNQUExQjs7O0FBV0EsU0FBSSxXQUFvQixFQUFFLElBQUYsQ0FBTyxFQUFQLENBQXhCO0FBQ0EsU0FBSSxvQkFBb0IsRUFBeEI7Ozs7O0FBT0EsY0FBUyxJQUFULEdBQWdCO0FBQ1osaUJBQVEsR0FBUixDQUFZLE1BQVo7OztBQUdBLFdBQUUsT0FBRixDQUFVO0FBQ04scUJBQVEsS0FERjtBQUVOLGtCQUFRLHNCQUZGO0FBR04sNEJBQWUsdUJBQVMsUUFBVCxFQUFtQjtBQUM5QixxQkFBSSxhQUFhLElBQUksT0FBSixFQUFqQjtBQUNBLHNCQUFLLElBQUksSUFBVCxJQUFpQixRQUFqQixFQUEyQjtBQUN2QixnQ0FBVyxJQUFYLENBQWdCLHFCQUFXLElBQVgsRUFBaUIsU0FBUyxJQUFULENBQWpCLENBQWhCO0FBQ0Esc0NBQWlCLElBQWpCLElBQXlCLElBQXpCO0FBQ0g7QUFDRCx3QkFBTyxVQUFQO0FBQ0g7QUFWSyxVQUFWLEVBWUMsSUFaRCxDQVlNLE9BWk47OztBQWVBLFdBQUUsT0FBRixDQUFVO0FBQ04scUJBQVEsS0FERjtBQUVOLGtCQUFRLHVCQUZGO0FBR04sNEJBQWUsdUJBQVMsUUFBVCxFQUFtQjtBQUM5QixxQkFBSSxjQUFjLElBQUksUUFBSixFQUFsQjtBQUNBLHNCQUFLLElBQUksSUFBVCxJQUFpQixRQUFqQixFQUEyQjtBQUN2QixpQ0FBWSxJQUFaLENBQWlCLHNCQUFZLElBQVosRUFBa0IsU0FBUyxJQUFULENBQWxCLENBQWpCO0FBQ0EsdUNBQWtCLElBQWxCLElBQTBCLElBQTFCO0FBQ0g7QUFDRCx3QkFBTyxXQUFQO0FBQ0g7QUFWSyxVQUFWLEVBWUMsSUFaRCxDQVlNLFFBWk47QUFjSDs7Ozs7QUFNRCxTQUFJLFVBQVU7QUFDVixxQkFBWSxvQkFBUyxJQUFULEVBQWU7QUFDdkIscUJBQVEsR0FBUixDQUFZLG9CQUFaOztBQUVBLGtCQUFLLGFBQUwsR0FBcUIsSUFBSSxpQkFBUyxVQUFiLENBQXdCO0FBQ3hDLDBCQUFTLGNBRCtCO0FBRXhDLDBCQUFTO0FBRitCLGNBQXhCLENBQXJCOztBQUtBLGtCQUFLLFdBQUwsR0FBbUIsSUFBSSxpQkFBUyxVQUFiLENBQXdCO0FBQ3RDLDBCQUFTLGNBRDZCO0FBRXRDLDBCQUFTO0FBRjZCLGNBQXhCLENBQW5COztBQUtBLGtCQUFLLGFBQUwsR0FBcUIsSUFBSSxpQkFBUyxVQUFiLENBQXdCO0FBQ3hDLDBCQUFTLGlCQUQrQjtBQUV4QywwQkFBUztBQUYrQixjQUF4QixDQUFyQjs7O0FBTUgsVUFwQlM7O0FBc0JWLGVBQU0sY0FBUyxJQUFULEVBQWU7QUFDakIscUJBQVEsR0FBUixDQUFZLGNBQVo7O0FBRUEsb0JBQU8sQ0FDSCxJQUFJLGlCQUFTLElBQWIsQ0FBa0IsS0FBSyxhQUF2QixDQURHLEVBRUgsSUFBSSxpQkFBUyxJQUFiLENBQWtCLEtBQUssV0FBdkIsQ0FGRyxFQUdILElBQUksaUJBQVMsSUFBYixDQUFrQixLQUFLLGFBQXZCLENBSEcsQ0FBUDtBQUtIO0FBOUJTLE1BQWQ7Ozs7O0FBcUNBLFlBQU87QUFDSCxpQkFBWSxJQURUO0FBRUgsb0JBQVk7QUFGVCxNQUFQO0FBSUgsRTs7QUFwSEQ7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkEsS0FBSSxXQUFXO0FBQ1YsaUJBQVksb0JBQVMsSUFBVCxFQUFlO0FBQ3ZCLGNBQUssT0FBTCxHQUFrQixLQUFLLE9BQUwsSUFBZ0IsRUFBbEM7QUFDQSxjQUFLLEtBQUwsR0FBa0IsRUFBRSxJQUFGLENBQU8sS0FBSyxLQUFaLENBQWxCO0FBQ0EsY0FBSyxPQUFMLEdBQWtCLEtBQUssT0FBdkI7QUFDQSxjQUFLLE9BQUwsR0FBa0IsS0FBSyxPQUFMLElBQWdCLEVBQWxDOztBQUVILE1BUFM7O0FBU1YsV0FBTSxjQUFTLElBQVQsRUFBZTtBQUNqQixhQUFJLFNBQVMsU0FBVCxNQUFTLENBQVMsR0FBVCxFQUFjO0FBQ3ZCLG9CQUFPLEVBQUUsUUFBRixFQUFZLEVBQUUsT0FBTyxHQUFULEVBQVosRUFBNEIsS0FBSyxPQUFMLENBQWEsR0FBYixDQUE1QixDQUFQO0FBQ0gsVUFGRDs7QUFJQSxhQUFJLFVBQVUsRUFBZDtBQUNBLGFBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2QsdUJBQVUsRUFBRSxRQUFGLEVBQVk7QUFDbEIsd0JBQVksRUFETTtBQUVsQiwyQkFBWSxVQUZNO0FBR2xCLDJCQUFZO0FBSE0sY0FBWixFQUlQLEtBQUssT0FKRSxDQUFWO0FBS0g7O0FBRUQsZ0JBQU8sQ0FDSCxFQUFFLFFBQUYsRUFBWTtBQUNKLHlCQUFZLEVBQUUsUUFBRixDQUFXLE9BQVgsRUFBb0IsS0FBSyxLQUF6QixDQURSO0FBRUosc0JBQVksS0FBSyxLQUFMLEVBRlI7QUFHSixzQkFBWSxLQUFLO0FBSGIsVUFBWixFQUtJLENBQ0ksT0FESixFQUM4QixPQUFPLElBQVAsQ0FBWSxLQUFLLE9BQWpCLEVBQTBCLEdBQTFCLENBQThCLE1BQTlCLENBRDlCLENBTEosQ0FERyxDQUFQO0FBV0g7QUFsQ1MsRUFBZjs7U0FxQ1UsUSxHQUFBLFE7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQ3JDVyxNLEdBRWpCLGdCQUFZLElBQVosRUFBa0IsT0FBbEIsRUFBMkI7QUFBQTs7QUFDdkIsYUFBUSxHQUFSLENBQVksa0JBQWtCLElBQTlCO0FBQ0EsVUFBSyxJQUFMLEdBQWMsRUFBRSxJQUFGLENBQU8sSUFBUCxDQUFkO0FBQ0EsVUFBSyxLQUFMLEdBQWMsRUFBRSxJQUFGLENBQU8sUUFBUSxLQUFmLENBQWQ7QUFDSCxFOzttQkFOZ0IsTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDQUEsTyxHQUVqQixpQkFBWSxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCO0FBQUE7O0FBQ3ZCLGFBQVEsR0FBUixDQUFZLG1CQUFtQixJQUEvQjtBQUNBLFVBQUssSUFBTCxHQUFZLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FBWjtBQUNBLFVBQUssSUFBTCxHQUFZLEVBQUUsSUFBRixDQUFPLFFBQVEsSUFBZixDQUFaO0FBQ0EsVUFBSyxJQUFMLEdBQVksRUFBRSxJQUFGLENBQU8sUUFBUSxJQUFSLElBQWdCLElBQXZCLENBQVo7QUFDSCxFOzttQkFQZ0IsTyIsImZpbGUiOiJ3ZWJyb290L2pzL2ZlZWRiYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjM2IwZWQyMGY0MzA4NTMwYTQ4OVxuICoqLyIsIi8qKlxuICogTWFpbiBwcm9ncmFtLCB0byBzdGFydCBhbGwgdXAuXG4gKi9cbmltcG9ydCBBcHAgZnJvbSBcImFwcFwiO1xuXG5cblxuLyoqXG4gKiBNYWluIHRvIHN0YXJ0IGFsbCB1cC5cbiAqL1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBhcHAgPSBBcHAoKTtcblxuICAgIGFwcC5pbml0KCk7XG4gICAgbS5tb3VudChkb2N1bWVudC5ib2R5LCBhcHAud2lkZ2V0cyk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBtYWluLCBmYWxzZSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9tYWluLmpzXG4gKiovIiwiLyoqXG4gKiBGZWVkYmFjayBhcHBcbiAqL1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgeyBVSVNlbGVjdCB9IGZyb20gXCJjb21wb25lbnQvZm9ybS9zZWxlY3RcIjtcblxuLy8gTW9kZWxzXG5pbXBvcnQgQ291cnNlIGZyb20gXCJtb2RlbC9jb3Vyc2VcIjtcbmltcG9ydCBUZWFjaGVyIGZyb20gXCJtb2RlbC90ZWFjaGVyXCI7XG5cbi8vIEFwcFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBDbGFzc2VzXG4gICAgdmFyIENvdXJzZXMgPSBBcnJheTtcbiAgICB2YXIgVGVhY2hlcnMgPSBBcnJheTtcblxuICAgIC8vIEFsbCBjb3Vyc2VzXG4gICAgdmFyIGNvdXJzZXMgICAgICAgICAgICAgPSBtLnByb3AoW10pO1xuICAgIHZhciBjb3Vyc2VzQXNPcHRpb25zICAgID0ge307XG4gICAgdmFyIGttb21zQXNPcHRpb25zICAgICAgPSB7XG4gICAgICAgIFwia21vbTAxXCI6IFwia21vbTAxXCIsXG4gICAgICAgIFwia21vbTAyXCI6IFwia21vbTAyXCIsXG4gICAgICAgIFwia21vbTAzXCI6IFwia21vbTAzXCIsXG4gICAgICAgIFwia21vbTA0XCI6IFwia21vbTA0XCIsXG4gICAgICAgIFwia21vbTA1XCI6IFwia21vbTA1XCIsXG4gICAgICAgIFwia21vbTA2XCI6IFwia21vbTA2XCIsXG4gICAgICAgIFwia21vbTEwXCI6IFwia21vbTEwXCJcbiAgICB9O1xuXG4gICAgLy8gQWxsIHRlYWNoZXJzXG4gICAgdmFyIHRlYWNoZXJzICAgICAgICAgID0gbS5wcm9wKFtdKTtcbiAgICB2YXIgdGVhY2hlcnNBc09wdGlvbnMgPSB7fTtcblxuXG5cbiAgICAvKipcbiAgICAgKiBMb2FkIGFzc2V0cyBhbmQgaW5pdCBhcHBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluaXRcIik7XG5cbiAgICAgICAgLy8gUmVhZCBpbmZvIGFib3V0IGFsbCBjb3Vyc2VzXG4gICAgICAgIG0ucmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6ICAgIFwiLi4vanNvbi9jb3Vyc2VzLmpzb25cIixcbiAgICAgICAgICAgIHVud3JhcFN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdXJzZUxpc3QgPSBuZXcgQ291cnNlcygpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlTGlzdC5wdXNoKG5ldyBDb3Vyc2UobmFtZSwgcmVzcG9uc2VbbmFtZV0pKTtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlc0FzT3B0aW9uc1tuYW1lXSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VMaXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjb3Vyc2VzKTtcblxuICAgICAgICAvLyBSZWFkIGluZm8gYWJvdXQgYWxsIHRlYWNoZXJzXG4gICAgICAgIG0ucmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6ICAgIFwiLi4vanNvbi90ZWFjaGVycy5qc29uXCIsXG4gICAgICAgICAgICB1bndyYXBTdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHZhciB0ZWFjaGVyTGlzdCA9IG5ldyBUZWFjaGVycygpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVhY2hlckxpc3QucHVzaChuZXcgVGVhY2hlcihuYW1lLCByZXNwb25zZVtuYW1lXSkpO1xuICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyc0FzT3B0aW9uc1tuYW1lXSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0ZWFjaGVyTGlzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4odGVhY2hlcnMpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBbGwgd2lkZ2V0c1xuICAgICAqL1xuICAgIHZhciB3aWRnZXRzID0ge1xuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldpZGdldHMgY29udHJvbGxlclwiKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RDb3Vyc2VzID0gbmV3IFVJU2VsZWN0LmNvbnRyb2xsZXIoe1xuICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlbDpGxqIGt1cnMuLi5cIixcbiAgICAgICAgICAgICAgICAgb3B0aW9uczogY291cnNlc0FzT3B0aW9uc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0S21vbXMgPSBuZXcgVUlTZWxlY3QuY29udHJvbGxlcih7XG4gICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVsOkbGoga21vbS4uLlwiLFxuICAgICAgICAgICAgICAgICBvcHRpb25zOiBrbW9tc0FzT3B0aW9uc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGVhY2hlciA9IG5ldyBVSVNlbGVjdC5jb250cm9sbGVyKHtcbiAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw6RsaiByw6R0dGFyZS4uLlwiLFxuICAgICAgICAgICAgICAgICBvcHRpb25zOiB0ZWFjaGVyc0FzT3B0aW9uc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmlldzogZnVuY3Rpb24oY3RybCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXaWRnZXRzIHZpZXdcIik7XG5cbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgbmV3IFVJU2VsZWN0LnZpZXcoY3RybC5zZWxlY3RDb3Vyc2VzKSxcbiAgICAgICAgICAgICAgICBuZXcgVUlTZWxlY3QudmlldyhjdHJsLnNlbGVjdEttb21zKSxcbiAgICAgICAgICAgICAgICBuZXcgVUlTZWxlY3QudmlldyhjdHJsLnNlbGVjdFRlYWNoZXIpXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogRXhwb3J0IHRoZXNlLlxuICAgICAqL1xuICAgIHJldHVybiB7XG4gICAgICAgIFwiaW5pdFwiOiAgICAgaW5pdCxcbiAgICAgICAgXCJ3aWRnZXRzXCI6ICB3aWRnZXRzXG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2FwcC5qc1xuICoqLyIsIi8qKlxuICogTW9kdWxlIGZvciBmb3JtIHNlbGVjdCBvcHRpb24gbGlzdFxuICovXG52YXIgVUlTZWxlY3QgPSB7XG4gICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgIHRoaXMuY2xhc3NlcyAgICA9IGRhdGEuY2xhc3NlcyB8fCAnJztcbiAgICAgICAgIHRoaXMudmFsdWUgICAgICA9IG0ucHJvcChkYXRhLnZhbHVlKTtcbiAgICAgICAgIHRoaXMuY2FwdGlvbiAgICA9IGRhdGEuY2FwdGlvbjtcbiAgICAgICAgIHRoaXMub3B0aW9ucyAgICA9IGRhdGEub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgIC8vcmV0dXJuIHRoaXM7XG4gICAgIH0sXG5cbiAgICAgdmlldzogZnVuY3Rpb24oY3RybCkge1xuICAgICAgICAgdmFyIG9wdGlvbiA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgIHJldHVybiBtKCdvcHRpb24nLCB7IHZhbHVlOiBrZXkgfSwgY3RybC5vcHRpb25zW2tleV0pO1xuICAgICAgICAgfTtcblxuICAgICAgICAgdmFyIGNhcHRpb24gPSBcIlwiO1xuICAgICAgICAgaWYgKGN0cmwuY2FwdGlvbikge1xuICAgICAgICAgICAgIGNhcHRpb24gPSBtKCdvcHRpb24nLCB7XG4gICAgICAgICAgICAgICAgIHZhbHVlOiAgICAgIFwiXCIsXG4gICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAgIFwic2VsZWN0ZWRcIixcbiAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICAgXCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgfSwgY3RybC5jYXB0aW9uKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICBtKFwic2VsZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgIFwib25jaGFuZ2VcIjogbS53aXRoQXR0cihcInZhbHVlXCIsIGN0cmwudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiAgICBjdHJsLnZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6ICAgIGN0cmwuY2xhc3Nlc1xuICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICBjYXB0aW9uLCAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGN0cmwub3B0aW9ucykubWFwKG9wdGlvbilcbiAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgIClcbiAgICAgICAgIF07XG4gICAgIH1cbiB9O1xuXG4gZXhwb3J0IHsgVUlTZWxlY3QgfTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudC9mb3JtL3NlbGVjdC5qc1xuICoqLyIsIi8qKlxuICogQ291cnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3Vyc2Uge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgZWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0ZSBjb3Vyc2VcIiArIG5hbWUpO1xuICAgICAgICB0aGlzLm5hbWUgICA9IG0ucHJvcChuYW1lKTtcbiAgICAgICAgdGhpcy5rbW9tcyAgPSBtLnByb3AoZWxlbWVudC5rbW9tcyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvbW9kZWwvY291cnNlLmpzXG4gKiovIiwiLyoqXG4gKiBDb3Vyc2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYWNoZXIge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgZWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0ZSB0ZWFjaGVyXCIgKyBuYW1lKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbS5wcm9wKG5hbWUpO1xuICAgICAgICB0aGlzLm1haWwgPSBtLnByb3AoZWxlbWVudC5tYWlsKTtcbiAgICAgICAgdGhpcy5jaGF0ID0gbS5wcm9wKGVsZW1lbnQuY2hhdCB8fCBudWxsKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9tb2RlbC90ZWFjaGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==