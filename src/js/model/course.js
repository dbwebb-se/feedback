/**
 * Course.
 */
export default class Course {

    constructor(name, element) {
        console.log("Create course" + name);
        this.name   = m.prop(name);
        this.kmoms  = m.prop(element.kmoms);
    }
}
