/**
 * Main program, to start all up.
 */
import App from "app";



/**
 * Main to start all up.
 */
function main() {
    "use strict";

    var app = App();

    app.init();
    m.mount(document.body, app.widgets);
}

window.addEventListener("load", main, false);
