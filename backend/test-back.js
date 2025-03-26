import { allUser } from "./backend.mjs"

const records = await allUser();
console.log(JSON.stringify(records,null,2));
