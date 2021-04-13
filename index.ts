const typeOf: (value: any) => string = new Proxy(
    (value) => {
        if (Array.isArray(value)) {
            const types = [...new Set(value.map((e) => typeOf(e)))].sort();

            if (types.length === 0) return `never[]`;

            if (types.length === 1 && !types[0]!.startsWith("readonly")) return `${types[0]}[]`;

            if (types.length === 2 && types.includes("undefined")) return `${types.find((t) => t !== "undefined")}?[]`;

            return `(${types.join(" | ")})[]`;
        }

        if (value === null) {
            return `null`;
        }

        if (typeof value === "object") {
            if (value.constructor.name === "Object") {
                if (!Object.keys(value).length) return `{}`;

                return `{ ${Object.entries(value)
                    .map(([k, v]) => `${k}: ${typeOf(v)}`)
                    .join("; ")} }`;
            }

            return value.constructor.name;
        }

        return typeof value;
    },
    {
        apply(fn, _, args) {
            const readonly = Object.isFrozen(args[0]) && ["object", "function"].includes(typeof args[0]) && args[0] !== null;

            return `${readonly ? "readonly " : ""}${fn(args[0])}`;
        },
    }
);

export default typeOf;

module.exports = typeOf;

console.log(typeOf({}));
console.log(typeOf(0));
console.log(typeOf(""));
console.log(typeOf({ hello: "world" }));
console.log(typeOf({ hello: "world", world: { answer: 42, people: [] } }));
console.log(typeOf(new (class Person {})()));
console.log(typeOf(null));
console.log(typeOf(undefined));
console.log(typeOf([]));
console.log(typeOf([1, 2, 3]));
console.log(typeOf(["", ""]));
console.log(typeOf(["", 0]));
console.log(typeOf(["", [0]]));
console.log(typeOf([[{ hello: "world" }]]));
console.log(typeOf([[""]]));
console.log(typeOf(Object.freeze({})));
console.log(typeOf(Object.freeze([])));
console.log(typeOf(Object.freeze([1, 2, 3])));
console.log(typeOf(Object.freeze({ hello: "world" })));
