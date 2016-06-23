/**
 * Course.
 */
export default class Teacher {

    constructor(name, element) {
        console.log("Create teacher" + name);
        this.name = m.prop(name);
        this.mail = m.prop(element.mail);
        this.chat = m.prop(element.chat || null);
    }
}
