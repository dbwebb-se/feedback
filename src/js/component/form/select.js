/**
 * Module for form select option list
 */
var UISelect = {
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

 export { UISelect };
