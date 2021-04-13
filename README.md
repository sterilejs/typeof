# typeof.js

**Extended typeof operator for more control over your types.**

Examples:

```ts
import typeOf from "typeof.js";

typeOf({}); // {}

typeOf(0); // number

typeOf(""); // string

typeOf({ hello: "world" }); // { hello: string }

typeOf({ hello: "world", world: { answer: 42, people: [] } }); // { hello: string; world: { answer: number; people: never[] } }

typeOf(new (class Person {})()); // Person

typeOf(null); // null

typeOf(undefined); // undefined

typeOf([]); // never[]

typeOf([1, 2, 3]); // number[]

typeOf(["", ""]); // string[]

typeOf(["", 0]); // (number | string)[]

typeOf(["", [0]]); // (number[] | string)[]

typeOf([[{ hello: "world" }]]); // { hello: string }[][]

typeOf([[""]]); // string[][]

typeOf(Object.freeze({})); // readonly {}

typeOf(Object.freeze([])); // readonly never[]

typeOf(Object.freeze([1, 2, 3])); // readonly number[]

typeOf(Object.freeze({ hello: "world" })); // readonly { hello: string }
```
