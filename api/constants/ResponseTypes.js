const RESPONSE_TYPES = [
    { type: 25, error: { name: "Missing Permission!", message: "You don't have the a permission for this certain action.", reason: "Missing Api Key.", provided: "None.", expected: "ApiKey" } },
    { type: 85, error: { name: "NO SERVER ACCESS!", message: "Invalid Cors Origin.", reason: "Requests from this origin to this certain path are blocked by the server by default.", provided: "None.", expected: "ApiKey" } },
    {
        type: 54,
        errorFunction: function (value, provided, expected) {
            return {
                name: "Operation Failed!",
                message: "The target object that you are trying to do actions with is null.",
                reason: value || "Unknown.",
                provided: provided || "???", expected: expected || "???"
            }
        }
    },
    {
        type: -1,
        errorFunction: function (value) {
            return {
                name: "Operation Failed!",
                message: "Your Operation has been failed due to an server error.",
                reason: value || "Unknown.",
                provided: "???", expected: "???"
            }
        }
    },

    {
        type: 20, value: function (value) {
            return {
                name: "Operation Succeed!",
                message: "Your Operation has been succesfuly completed.",
                reason: value || "Unknown.",
                provided: "???", expected: "???"
            }
        }
    },
    {
        type: 21, value: {
            name: "Operation Succeed!",
            message: "Your Operation has been succesfuly completed.",
            reason: "Unknown.",
            provided: "???", expected: "???"
        }
    }
];

export default class ResponseTypes {
    static #isBuilt = false;

    static buildClass() {
        if (this.#isBuilt) return;
        for (const obj of RESPONSE_TYPES) {
            const type = obj.type;
            Object.defineProperty(this, type, { get: () => this.get(type) });
        };

        this.#isBuilt = true;
    };

    static #addTypeToObject(obj, key) {
        obj[key].type = obj.type;
        return obj[key];
    };

    static #addTypeToFunction(obj, oldFunction, key) {
        const newFunction = function () {
            const args = [];

            for (let i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            };

            const result = oldFunction.apply(this, args);
            result.type = obj.type;
            return result;
        };

        obj[key] = newFunction;

        return newFunction;
    };

    static #formatObject(obj) {
        if (Array.isArray(obj)) {
            return obj.map(o => {
                return this.#formatObject(o);
            });
        } else if (typeof obj === "object") {
            if (typeof obj.errorFunction === "function") {
                return this.#addTypeToFunction(obj, obj.errorFunction, "errorFunction");
            } else if (obj.error) {
                return this.#addTypeToObject(obj, "error");
            } else if (obj.value) {
                const value = obj.value;
                const key = "value";
                if (typeof obj.value === "function") return this.#addTypeToFunction(obj, value, key);
                else return this.#addTypeToObject(obj, "value");
            };
        };

        return null;
    };

    static get(type) {
        const results = RESPONSE_TYPES.filter(r => r.type == type);
        return results && results.length > 0 ? this.#formatObject(results[0]) : {};
    }
};
