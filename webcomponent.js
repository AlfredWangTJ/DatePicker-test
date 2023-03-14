(function () {
    let version = "1.0.0";
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `<link rel="stylesheet" type="text/css" href="https://alfredwangtj.github.io/DatePicker-test/light.css"/>`;

    class DatePicker extends HTMLElement {
        constructor() {
            super();
            this.init();
        }
        
        init() {
            if (this.children.length === 2) return; //constructor called during drag+drop
            if (!this.querySelector("link")) {
                this.appendChild(tmpl.content.cloneNode(true));
            }
            var ctor = sap.m.DateTimePicker;
            var currdat = new Date();
            this.DP = new ctor({
                //Add default format and min Date - Alfred

                //--
                change: function () {
                    this.fireChanged();
                    this.dispatchEvent(new Event("onChange"));
                }.bind(this)
            }).addStyleClass("datePicker");
            this.DP.placeAt(this);
        }

        fireChanged() {
            var properties = { dateVal: this.DP.getDateValue() };
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: properties
                }
            }));
        }

        set dateVal(value) {
            if (value == undefined || !this.DP) return;
            if (typeof (value) === "string") value = new Date(value);
            this.DP.setDateValue(value);
        }

        set format(value) {
            if (!this.DP) return;
            this.DP.setDisplayFormat(value);
        }

    }

    customElements.define('nkappler-date-picker', DatePicker);
})();
