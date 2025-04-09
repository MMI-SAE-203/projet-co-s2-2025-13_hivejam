import { getGame, getJam, getTask, getTeam, getUser, getUserTeams } from "./backend.mjs"


// const records = await getUser('5r583s231sb31yb');
// console.log(JSON.stringify(records,null,2));

// const records = await getTeam('00n1jq1vph7w504');
// console.log(JSON.stringify(records,null,2));
// console.log(records.expand.game_jam);

// const records = await allPost();
// console.log(JSON.stringify(records,null,2));

// const records = await getGame('1ce901fqxqq1p63');
// console.log(JSON.stringify(records,null,2));

// const records = await getJam('f44p4fp3e43l9tb');
// console.log(JSON.stringify(records,null,2));

// const records = await getTask('g9hzk4emyk9ikl7');
// console.log(JSON.stringify(records,null,2));

const records = await getUserTeams('41cz975nah4jh7n');
console.log(JSON.stringify(records,null,2));