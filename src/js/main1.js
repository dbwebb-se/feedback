/**
 * Main js to kick everything up and running.
 */
var app = {};

app.courses = m.prop({});
app.coursesAsOptions = {};

app.init = function() {

    // Read all courses
    m.request({
        method: "GET",
        url:    "../json/courses.json",
        unwrapSuccess: function(response) {
            var courseList = new Courses();
            for (var name in response) {
                courseList.push(new Course(name, response[name]));
                app.coursesAsOptions[name] = name;
            }
            return courseList;
        }
    })
    .then(function(courses) {
        console.log("then");
        console.log(courses);
        console.log(app.coursesAsOptions);
    });

    console.log("Init");
};



/**
 * Model for course and courses.
 */
var Courses = Array;



var Course = function(name, element) {
    console.log("Create course" + name);
    this.name   = m.prop(name);
    this.kmoms  = m.prop(element.kmoms);
};





var Select = {
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



app.CoursesSelectOption = {
    controller: function(opts) {
        console.log("CoursesSelectOption");
        console.log(app.coursesAsOptions);

        this.selectCourses = new Select.controller({
             caption: "Välj kurs...",
             options: app.coursesAsOptions
        });

        this.selectKmoms = new Select.controller({
             caption: "Välj kmom...",
             options: app.coursesAsOptions
        });

        this.selectTeacher = new Select.controller({
             caption: "Välj rättare...",
             options: app.coursesAsOptions
        });

        //return this;
    },

    view: function(ctrl) {
        return [
            new Select.view(ctrl.selectCourses),
            new Select.view(ctrl.selectKmoms),
            new Select.view(ctrl.selectTeacher)
        ];
    }
};


/*

    return m('select', [
            m('option',
                {
                    value: '',
                    selected: 'selected',
                    disabled: 'disabled'
                },
                'Select your option'
            ),

            ctrl.select.options.map(function(opt) {
                return m('option',
                    {
                        val: opt
                    },
                    opt.charAt(0).toUpperCase() + opt.slice(1)
                );
            })
        ]);
};
*/


app.init();
m.mount(document.body, app.CoursesSelectOption);
