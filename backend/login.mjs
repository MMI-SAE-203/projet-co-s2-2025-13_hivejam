import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


export async function userRegister(data) {
    try {
        const record = await pb.collection('users').create(data);
        console.log("Vous avez crée votre compte !")
    } catch (e) {
        console.error(e);
    }
}

export async function userLogin(mail, mdp) {
    try {
        await pb.collection('users').authWithPassword(mail, mdp);
    } catch (e) {
        console.error(e);
    }
}