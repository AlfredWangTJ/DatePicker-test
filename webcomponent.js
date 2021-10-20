(function () {
    let version = "1.0.0";
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `<link rel="stylesheet" type="text/css" href="https://alfredwangtj.github.io/DatePicker-test/light.css"/>`;

    class DatePicker extends HTMLElement {
        constructor() {
            super();
            this.init();
            this.checkForUpdates();
        }
        
        async checkForUpdates() {
            try {
                const contribution = await (await fetch("https://alfredwangtj.github.io/DatePicker-test/datepicker.json")).json();
                if (contribution.version > version) {
                    console.log("A newer version of the Datepicker Custom Widget is available. Please contact your system administrator");
                }
            } catch (error) { }
        }

        init() {
            if (this.children.length === 2) return; //constructor called during drag+drop
            if (!this.querySelector("link")) {
                this.appendChild(tmpl.content.cloneNode(true));
            }
            var ctor = sap.m.DatePicker;
            var currdat = new Date();
            if (this._enablerange) { ctor = sap.m.DateRangeSelection; }
            this.DP = new ctor({
                //Add default format and min Date - Alfred
                valueFormat: "YYYY-MM-DD",
                displayFormat: "YYYY/MM/DD",
                minDate: currdat,
                maxDate: new Date(currdat.getFullYear+3 , 12 , 31),
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
            if (this._enablerange) { properties.secondDateVal = this.DP.getSecondDateValue(); }
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

        set secondDateVal(value) {
            if (value == undefined || !this.DP || !this._enablerange) return;
            if (typeof (value) === "string") value = new Date(value);
            this.DP.setSecondDateValue(value);
        }

        set format(value) {
            if (!this.DP) return;
            this.DP.setDisplayFormat(value);
        }

        set darktheme(value) {
            this.querySelector("link").setAttribute("href", "https://alfredwangtj.github.io/DatePicker-test/" +
                (value ? "dark.css" : "light.css")
            );
        }

        set enablerange(value) {
            if (value == undefined || !this.DP) return;
            this._enablerange = value;
            this.DP.destroy();
            this.init();
        }
    }

    customElements.define('nkappler-date-picker', DatePicker);
})();
