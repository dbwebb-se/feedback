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
	     *
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
	
	/*
	export default function() {
	    return {
	        controller: function(data) {
	            this.classes    = data.classes || '';
	            this.value      = m.prop(data.value);
	            this.caption    = data.caption;
	            this.options    = data.options || {};
	            //return this;
	        },

	        view: function(ctrl) {
	            var option = function(key) {
	                return m('option', { value: key }, ctrl.options[key]);
	            };

	            var caption = "";
	            if (ctrl.caption) {
	                caption = m('option', {
	                    value:      "",
	                    selected:   "selected",
	                    disabled:   "disabled"
	                }, ctrl.caption);
	            }

	            return [
	                m("select", {
	                        "onchange": m.withAttr("value", ctrl.value),
	                        "value":    ctrl.value(),
	                        "class":    ctrl.classes
	                    },
	                    [
	                        caption,                  Object.keys(ctrl.options).map(option)
	                    ]
	                )
	            ];
	        }
	    };
	}
	*/

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDI1N2UyNTA3M2VjOTg5YmY4MDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50L2Zvcm0vc2VsZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2RlbC9jb3Vyc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZGVsL3RlYWNoZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ25DQTs7Ozs7Ozs7O0FBT0EsVUFBUyxJQUFULEdBQWdCO0FBQ1o7O0FBRUEsT0FBSSxNQUFNLG9CQUFWOztBQUVBLE9BQUksSUFBSjtBQUNBLEtBQUUsS0FBRixDQUFRLFNBQVMsSUFBakIsRUFBdUIsSUFBSSxPQUEzQjtBQUNILEU7Ozs7O0FBRUQsUUFBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxJQUFoQyxFQUFzQyxLQUF0QyxFOzs7Ozs7Ozs7Ozs7bUJDQWUsWUFBVztBQUN0Qjs7OztBQUdBLFNBQUksVUFBVSxLQUFkO0FBQ0EsU0FBSSxXQUFXLEtBQWY7OztBQUdBLFNBQUksVUFBc0IsRUFBRSxJQUFGLENBQU8sRUFBUCxDQUExQjtBQUNBLFNBQUksbUJBQXNCLEVBQTFCO0FBQ0EsU0FBSSxpQkFBc0I7QUFDdEIsbUJBQVUsUUFEWTtBQUV0QixtQkFBVSxRQUZZO0FBR3RCLG1CQUFVLFFBSFk7QUFJdEIsbUJBQVUsUUFKWTtBQUt0QixtQkFBVSxRQUxZO0FBTXRCLG1CQUFVLFFBTlk7QUFP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LElBQUYsQ0FBTyxRQUFRLElBQVIsSUFBZ0IsSUFBdkIsQ0FBWjtBQUNILEU7O21CQVBnQixPIiwiZmlsZSI6IndlYnJvb3QvanMvZmVlZGJhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDAyNTdlMjUwNzNlYzk4OWJmODAxXG4gKiovIiwiLyoqXG4gKiBNYWluIHByb2dyYW0sIHRvIHN0YXJ0IGFsbCB1cC5cbiAqL1xuaW1wb3J0IEFwcCBmcm9tIFwiYXBwXCI7XG5cblxuXG4vKipcbiAqIE1haW4gdG8gc3RhcnQgYWxsIHVwLlxuICovXG5mdW5jdGlvbiBtYWluKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGFwcCA9IEFwcCgpO1xuXG4gICAgYXBwLmluaXQoKTtcbiAgICBtLm1vdW50KGRvY3VtZW50LmJvZHksIGFwcC53aWRnZXRzKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG1haW4sIGZhbHNlKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL21haW4uanNcbiAqKi8iLCIvKipcbiAqIEZlZWRiYWNrIGFwcFxuICovXG4vKlxuaW1wb3J0IFwidXRpbHMvcmVxdWVzdC1hbmltLWZyYW1lXCI7XG5pbXBvcnQgQ2FudmFzIGZyb20gXCJ1dGlscy9jYW52YXNcIjtcbmltcG9ydCBWZWN0b3IgZnJvbSBcInV0aWxzL3ZlY3RvclwiO1xuaW1wb3J0IEtleSBmcm9tIFwidXRpbHMva2V5LWV2ZW50c1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcInNoaXBcIjtcbmltcG9ydCBCdWxsZXQgZnJvbSBcImJ1bGxldFwiO1xuKi9cbi8vIENvbXBvbmVudHNcbmltcG9ydCB7IFVJU2VsZWN0IH0gZnJvbSBcImNvbXBvbmVudC9mb3JtL3NlbGVjdFwiO1xuXG4vLyBNb2RlbHNcbmltcG9ydCBDb3Vyc2UgZnJvbSBcIm1vZGVsL2NvdXJzZVwiO1xuaW1wb3J0IFRlYWNoZXIgZnJvbSBcIm1vZGVsL3RlYWNoZXJcIjtcblxuLy8gQXBwXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIENsYXNzZXNcbiAgICB2YXIgQ291cnNlcyA9IEFycmF5O1xuICAgIHZhciBUZWFjaGVycyA9IEFycmF5O1xuXG4gICAgLy8gQWxsIGNvdXJzZXNcbiAgICB2YXIgY291cnNlcyAgICAgICAgICAgICA9IG0ucHJvcChbXSk7XG4gICAgdmFyIGNvdXJzZXNBc09wdGlvbnMgICAgPSB7fTtcbiAgICB2YXIga21vbXNBc09wdGlvbnMgICAgICA9IHtcbiAgICAgICAgXCJrbW9tMDFcIjogXCJrbW9tMDFcIixcbiAgICAgICAgXCJrbW9tMDJcIjogXCJrbW9tMDJcIixcbiAgICAgICAgXCJrbW9tMDNcIjogXCJrbW9tMDNcIixcbiAgICAgICAgXCJrbW9tMDRcIjogXCJrbW9tMDRcIixcbiAgICAgICAgXCJrbW9tMDVcIjogXCJrbW9tMDVcIixcbiAgICAgICAgXCJrbW9tMDZcIjogXCJrbW9tMDZcIixcbiAgICAgICAgXCJrbW9tMTBcIjogXCJrbW9tMTBcIlxuICAgIH07XG5cbiAgICAvLyBBbGwgdGVhY2hlcnNcbiAgICB2YXIgdGVhY2hlcnMgICAgICAgICAgPSBtLnByb3AoW10pO1xuICAgIHZhciB0ZWFjaGVyc0FzT3B0aW9ucyA9IHt9O1xuXG5cblxuICAgIC8qKlxuICAgICAqIExvYWQgYXNzZXRzIGFuZCBpbml0IGFwcFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5pdFwiKTtcblxuICAgICAgICAvLyBSZWFkIGluZm8gYWJvdXQgYWxsIGNvdXJzZXNcbiAgICAgICAgbS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogICAgXCIuLi9qc29uL2NvdXJzZXMuanNvblwiLFxuICAgICAgICAgICAgdW53cmFwU3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgY291cnNlTGlzdCA9IG5ldyBDb3Vyc2VzKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiByZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VMaXN0LnB1c2gobmV3IENvdXJzZShuYW1lLCByZXNwb25zZVtuYW1lXSkpO1xuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VzQXNPcHRpb25zW25hbWVdID0gbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZUxpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNvdXJzZXMpO1xuXG4gICAgICAgIC8vIFJlYWQgaW5mbyBhYm91dCBhbGwgdGVhY2hlcnNcbiAgICAgICAgbS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogICAgXCIuLi9qc29uL3RlYWNoZXJzLmpzb25cIixcbiAgICAgICAgICAgIHVud3JhcFN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlYWNoZXJMaXN0ID0gbmV3IFRlYWNoZXJzKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiByZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyTGlzdC5wdXNoKG5ldyBUZWFjaGVyKG5hbWUsIHJlc3BvbnNlW25hbWVdKSk7XG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXJzQXNPcHRpb25zW25hbWVdID0gbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlYWNoZXJMaXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbih0ZWFjaGVycyk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFsbCB3aWRnZXRzXG4gICAgICovXG4gICAgdmFyIHdpZGdldHMgPSB7XG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2lkZ2V0cyBjb250cm9sbGVyXCIpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENvdXJzZXMgPSBuZXcgVUlTZWxlY3QuY29udHJvbGxlcih7XG4gICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVsOkbGoga3Vycy4uLlwiLFxuICAgICAgICAgICAgICAgICBvcHRpb25zOiBjb3Vyc2VzQXNPcHRpb25zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RLbW9tcyA9IG5ldyBVSVNlbGVjdC5jb250cm9sbGVyKHtcbiAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw6RsaiBrbW9tLi4uXCIsXG4gICAgICAgICAgICAgICAgIG9wdGlvbnM6IGttb21zQXNPcHRpb25zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUZWFjaGVyID0gbmV3IFVJU2VsZWN0LmNvbnRyb2xsZXIoe1xuICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlbDpGxqIHLDpHR0YXJlLi4uXCIsXG4gICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRlYWNoZXJzQXNPcHRpb25zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICB2aWV3OiBmdW5jdGlvbihjdHJsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldpZGdldHMgdmlld1wiKTtcblxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBuZXcgVUlTZWxlY3QudmlldyhjdHJsLnNlbGVjdENvdXJzZXMpLFxuICAgICAgICAgICAgICAgIG5ldyBVSVNlbGVjdC52aWV3KGN0cmwuc2VsZWN0S21vbXMpLFxuICAgICAgICAgICAgICAgIG5ldyBVSVNlbGVjdC52aWV3KGN0cmwuc2VsZWN0VGVhY2hlcilcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHJldHVybiB7XG4gICAgICAgIFwiaW5pdFwiOiAgICAgaW5pdCxcbiAgICAgICAgXCJ3aWRnZXRzXCI6ICB3aWRnZXRzXG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2FwcC5qc1xuICoqLyIsIi8qKlxuICogTW9kdWxlIGZvciBmb3JtIHNlbGVjdCBvcHRpb24gbGlzdFxuICovXG52YXIgVUlTZWxlY3QgPSB7XG4gICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgIHRoaXMuY2xhc3NlcyAgICA9IGRhdGEuY2xhc3NlcyB8fCAnJztcbiAgICAgICAgIHRoaXMudmFsdWUgICAgICA9IG0ucHJvcChkYXRhLnZhbHVlKTtcbiAgICAgICAgIHRoaXMuY2FwdGlvbiAgICA9IGRhdGEuY2FwdGlvbjtcbiAgICAgICAgIHRoaXMub3B0aW9ucyAgICA9IGRhdGEub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgIC8vcmV0dXJuIHRoaXM7XG4gICAgIH0sXG5cbiAgICAgdmlldzogZnVuY3Rpb24oY3RybCkge1xuICAgICAgICAgdmFyIG9wdGlvbiA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgIHJldHVybiBtKCdvcHRpb24nLCB7IHZhbHVlOiBrZXkgfSwgY3RybC5vcHRpb25zW2tleV0pO1xuICAgICAgICAgfTtcblxuICAgICAgICAgdmFyIGNhcHRpb24gPSBcIlwiO1xuICAgICAgICAgaWYgKGN0cmwuY2FwdGlvbikge1xuICAgICAgICAgICAgIGNhcHRpb24gPSBtKCdvcHRpb24nLCB7XG4gICAgICAgICAgICAgICAgIHZhbHVlOiAgICAgIFwiXCIsXG4gICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAgIFwic2VsZWN0ZWRcIixcbiAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICAgXCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgfSwgY3RybC5jYXB0aW9uKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICBtKFwic2VsZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgIFwib25jaGFuZ2VcIjogbS53aXRoQXR0cihcInZhbHVlXCIsIGN0cmwudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiAgICBjdHJsLnZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6ICAgIGN0cmwuY2xhc3Nlc1xuICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICBjYXB0aW9uLCAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGN0cmwub3B0aW9ucykubWFwKG9wdGlvbilcbiAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgIClcbiAgICAgICAgIF07XG4gICAgIH1cbiB9O1xuXG4gZXhwb3J0IHsgVUlTZWxlY3QgfTtcblxuLypcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NlcyAgICA9IGRhdGEuY2xhc3NlcyB8fCAnJztcbiAgICAgICAgICAgIHRoaXMudmFsdWUgICAgICA9IG0ucHJvcChkYXRhLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuY2FwdGlvbiAgICA9IGRhdGEuY2FwdGlvbjtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyAgICA9IGRhdGEub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmlldzogZnVuY3Rpb24oY3RybCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbiA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtKCdvcHRpb24nLCB7IHZhbHVlOiBrZXkgfSwgY3RybC5vcHRpb25zW2tleV0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGNhcHRpb24gPSBcIlwiO1xuICAgICAgICAgICAgaWYgKGN0cmwuY2FwdGlvbikge1xuICAgICAgICAgICAgICAgIGNhcHRpb24gPSBtKCdvcHRpb24nLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAgICAgIFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAgIFwic2VsZWN0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICAgXCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgfSwgY3RybC5jYXB0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBtKFwic2VsZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib25jaGFuZ2VcIjogbS53aXRoQXR0cihcInZhbHVlXCIsIGN0cmwudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiAgICBjdHJsLnZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6ICAgIGN0cmwuY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uLCAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGN0cmwub3B0aW9ucykubWFwKG9wdGlvbilcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9O1xufVxuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudC9mb3JtL3NlbGVjdC5qc1xuICoqLyIsIi8qKlxuICogQ291cnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3Vyc2Uge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgZWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0ZSBjb3Vyc2VcIiArIG5hbWUpO1xuICAgICAgICB0aGlzLm5hbWUgICA9IG0ucHJvcChuYW1lKTtcbiAgICAgICAgdGhpcy5rbW9tcyAgPSBtLnByb3AoZWxlbWVudC5rbW9tcyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvbW9kZWwvY291cnNlLmpzXG4gKiovIiwiLyoqXG4gKiBDb3Vyc2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYWNoZXIge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgZWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0ZSB0ZWFjaGVyXCIgKyBuYW1lKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbS5wcm9wKG5hbWUpO1xuICAgICAgICB0aGlzLm1haWwgPSBtLnByb3AoZWxlbWVudC5tYWlsKTtcbiAgICAgICAgdGhpcy5jaGF0ID0gbS5wcm9wKGVsZW1lbnQuY2hhdCB8fCBudWxsKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9tb2RlbC90ZWFjaGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==