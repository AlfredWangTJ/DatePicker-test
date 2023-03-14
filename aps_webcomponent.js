(function () {
    let version = "1.0.0";

    class DatePickerAps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            ["select"].forEach(id =>
                this._shadowRoot.getElementById(id).addEventListener("change", this._submit.bind(this)));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('propertiesChanged', {
                detail: {
                    properties: {
                        format: this.format
                    }
                }
            }));
            return false;
        }

        get format() {
            return this._shadowRoot.querySelector("option[name='aps_format']:checked").value;
        }

        set format(value) {
            this._shadowRoot.querySelector("option[name='aps_format'][value='" + value + "']").checked = "checked";
        }
    }

    customElements.define('nkappler-datepicker-aps', DatePickerAps);
})();