/**
 * Main js to kick everything up and running.
 */
var Course = function(data) {
    data = data || {};
    this.id     = m.prop(data.id    || "");
    this.name   = m.prop(data.name  || "");
    this.email  = m.prop(data.email || "");
};

var Courses = function(data) {
    this.data = m.request({
        method: "GET",
        url:    "../json/courses.json"
    });
    data = data || {};
    this.id     = m.prop(data.id    || "")
    this.name   = m.prop(data.name  || "")
    this.email  = m.prop(data.email || "")
};

Courses.list = function() {
    return [ "htmlphp", "python" ];
};

Courses.listParts = function(course) {
    return [ "kmom01", "kmom02" ];
};

var app = {};
app.controller = function(opts) {
  this.opts = ["Chrome", "Safari", "Firefox"];
};
app.view = function(ctrl, opts) {
    return m('select', [
    m('option', {
        value: '',
        selected: 'selected',
        disabled: 'disabled'
    }, 'Select your option'),
    ctrl.opts.map(function(opt) {
        return m('option', {
            val: opt
        }, opt.charAt(0).toUpperCase()+opt.slice(1));
    })
]);
};

m.mount(document.body, app);



var FeedbackWidget = {

    controller: function update() {
        this.courses = Courses.list();
    },

    view: function(ctrl) {
        return [
            m.component(CoursesForm, {
                //onsave: ctrl.save,
                courses: ctrl.courses
            })/*,
            m.component(ContactList, { contacts: ctrl.contacts })*/
/*
        ];
    }

};



var CoursesForm = {

    controller: function(args) {
        //this.contact = m.prop(args.contact || new Contact())
        this.courses = m.prop(args.courses);
    },

    view: function(ctrl, args) {
        var courses = ctrl.courses();

        return m("form", [

            m("label", "Courses"),
            m("input", {
                oninput:    m.withAttr("value", courses.name),
                value:      courses.name()
            }),

            m("label", "Email"),
            m("input", {
                oninput: m.withAttr("value", courses.email),
                value: courses.email()
            }),

            m("button[type=button]", {
                    onclick: args.onsave.bind(this, courses)
                },
                "Save"
            )
        ]);
    }
};
*/


var Contact = function(data) {
    data = data || {}
    this.id = m.prop(data.id || "")
    this.name = m.prop(data.name || "")
    this.email = m.prop(data.email || "")
}
Contact.list = function(data) {
    return m.request({method: "GET", url: "/api/contact", type: Contact})
}
Contact.save = function(data) {
    return m.request({method: "POST", url: "/api/contact", data: data})
}



var ContactsWidget = {
    controller: function update() {
        this.contacts = Contact.list()
        this.save = function(contact) {
            Contact.save(contact).then(update.bind(this))
        }.bind(this)
    },
    view: function(ctrl) {
        return [
            m.component(ContactForm, {onsave: ctrl.save}),
            m.component(ContactList, {contacts: ctrl.contacts})
        ]
    }
}

var ContactForm = {
    controller: function(args) {
        this.contact = m.prop(args.contact || new Contact())
    },
    view: function(ctrl, args) {
        var contact = ctrl.contact()

        return m("form", [
            m("label", "Name"),
            m("input", {oninput: m.withAttr("value", contact.name), value: contact.name()}),

            m("label", "Email"),
            m("input", {oninput: m.withAttr("value", contact.email), value: contact.email()}),

            m("button[type=button]", {onclick: args.onsave.bind(this, contact)}, "Save")
        ])
    }
}

var ContactList = {
    view: function(ctrl, args) {
        return m("table", [
            args.contacts().map(function(contact) {
                return m("tr", [
                    m("td", contact.id()),
                    m("td", contact.name()),
                    m("td", contact.email())
                ])
            })
        ])
    }
}

m.mount(document.body, ContactsWidget)


/*
var App = {
    view: function() {
        return m('.container', [
            m('h1', 'Countries'),

            m.component(Select, {
                className: 'form-control',

                // With the Countries model
                options: Countries.get(function(option) {
                    return option.name.indexOf('A', 0) === 0;
                }),

                change: function(event) {
                    event.preventDefault();
                    m.render(document.getElementById('country'),
                    m.component(Country, { name: event.target.value }));
                }
            }),

            m('hr'),
            m('#country', m.component(Country, { name: 'Select a country' }))
        ]);
    }
};

var Country = {
    view: function(ctrl, args) {
        return m("h2", { className: 'text-primary' }, args.name);
    }
};

var Countries = {
    get: function(filter) {
        filter = filter || function(option) { return option; };
        //return m.request({
            method: "GET",
            url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/170817/countries.json'
        })
        .then(function(list) {
            return list.filter(filter);
        });
    }
};

var Select = {

    controller: function(args, extras) {
        return {
            options: args.options,
            select: args.change,
            className: args.className
        };
    },

    view: function(ctrl) {
        return m("select", {
                className: ctrl.className,
                onchange: ctrl.select
            },
            ctrl.options().map(function(option) {
                return m("option", { value: option.id }, option.name);
            })
        );
    }
};


//initialize
m.mount(document.body, App);
//m.mount(document.getElementById("example"), App);




/*

var Page = {
    list: function() {
        return m.request({method: "GET", url: "../json/htmlphp.json"});
    }
};

var Demo = {
    //controller
    controller: function() {
        var pages = Page.list();
        return {
            pages: pages,
            rotate: function() {
                pages().push(pages().shift());
            }
        };
    },

    //view
    view: function(ctrl) {
        return m("div", [
            ctrl.pages().map(function(page) {
                return m("a", {href: page.url}, page.title);
            }),
            m("button", {onclick: ctrl.rotate}, "Rotate links")
        ]);
    }
};

//initialize
m.mount(document.getElementById("example"), FeedbackWidget);
m.mount(document.getElementById("example1"), Demo);
*/
