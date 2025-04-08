import { allPost, getGame, getTeam, getUser } from "./backend.mjs"


// const records = await getUser('5r583s231sb31yb');
// console.log(JSON.stringify(records,null,2));

// const records = await getTeam('00n1jq1vph7w504');
// console.log(JSON.stringify(records,null,2));

// const records = await allPost();
// console.log(JSON.stringify(records,null,2));

const records = await getGame('1ce901fqxqq1p63');
console.log(JSON.stringify(records,null,2));