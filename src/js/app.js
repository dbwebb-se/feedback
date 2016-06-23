/**
 * Feedback app
 */

// Components
import { UISelect } from "component/form/select";

// Models
import Course from "model/course";
import Teacher from "model/teacher";

// App
export default function() {
    "use strict";

    // Classes
    var Courses = Array;
    var Teachers = Array;

    // All courses
    var courses             = m.prop([]);
    var coursesAsOptions    = {};
    var kmomsAsOptions      = {
        "kmom01": "kmom01",
        "kmom02": "kmom02",
        "kmom03": "kmom03",
        "kmom04": "kmom04",
        "kmom05": "kmom05",
        "kmom06": "kmom06",
        "kmom10": "kmom10"
    };

    // All teachers
    var teachers          = m.prop([]);
    var teachersAsOptions = {};



    /**
     * Load assets and init app
     */
    function init() {
        console.log("Init");

        // Read info about all courses
        m.request({
            method: "GET",
            url:    "../json/courses.json",
            unwrapSuccess: function(response) {
                var courseList = new Courses();
                for (var name in response) {
                    courseList.push(new Course(name, response[name]));
                    coursesAsOptions[name] = name;
                }
                return courseList;
            }
        })
        .then(courses);

        // Read info about all teachers
        m.request({
            method: "GET",
            url:    "../json/teachers.json",
            unwrapSuccess: function(response) {
                var teacherList = new Teachers();
                for (var name in response) {
                    teacherList.push(new Teacher(name, response[name]));
                    teachersAsOptions[name] = name;
                }
                return teacherList;
            }
        })
        .then(teachers);

    }


    /**
     * All widgets
     */
    var widgets = {
        controller: function(opts) {
            console.log("Widgets controller");

            this.selectCourses = new UISelect.controller({
                 caption: "Välj kurs...",
                 options: coursesAsOptions
            });

            this.selectKmoms = new UISelect.controller({
                 caption: "Välj kmom...",
                 options: kmomsAsOptions
            });

            this.selectTeacher = new UISelect.controller({
                 caption: "Välj rättare...",
                 options: teachersAsOptions
            });

            //return this;
        },

        view: function(ctrl) {
            console.log("Widgets view");

            return [
                new UISelect.view(ctrl.selectCourses),
                new UISelect.view(ctrl.selectKmoms),
                new UISelect.view(ctrl.selectTeacher)
            ];
        }
    };


    /**
     * Export these.
     */
    return {
        "init":     init,
        "widgets":  widgets
    };
}
