"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeOf = new Proxy(function (value) {
    if (Array.isArray(value)) {
        if (Object.isSealed(value) && value.length) {
            return "[" + value.map(typeOf).join(", ") + "]";
        }
        var types = __spreadArray([], __read(new Set(value.map(typeOf)))).sort();
        if (types.length === 0)
            return "never[]";
        if (types.length === 1 && !types[0].startsWith("readonly"))
            return types[0] + "[]";
        if (types.length === 2 && types.includes("undefined"))
            return types.find(function (t) { return t !== "undefined"; }) + "?[]";
        return "(" + types.join(" | ") + ")[]";
    }
    if (value === null) {
        return "null";
    }
    if (typeof value === "object") {
        if (value.constructor.name === "Object") {
            if (!Object.keys(value).length)
                return "{}";
            return "{ " + Object.entries(value)
                .map(function (_a) {
                var _b = __read(_a, 2), k = _b[0], v = _b[1];
                return k + ": " + typeOf(v);
            })
                .join("; ") + " }";
        }
        return value.constructor.name;
    }
    return typeof value;
}, {
    apply: function (fn, _, args) {
        var readonly = Object.isFrozen(args[0]) && ["object", "function"].includes(typeof args[0]) && args[0] !== null;
        return "" + (readonly ? "readonly " : "") + fn(args[0]);
    },
});
exports.default = typeOf;
module.exports = typeOf;
