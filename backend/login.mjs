import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');



// example create data
// const data = {
//     "password": "12345678",
//     "passwordConfirm": "12345678",
//     "email": "elias@example.com",
// };

export async function userRegister(data) {
    try {
        const record = await pb.collection('users').create(data);
        console.log("c bon mec normalement")
    } catch (e) {
        console.log(e);
    }
}