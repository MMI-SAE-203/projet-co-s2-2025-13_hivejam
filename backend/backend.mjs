import Pocketbase from "pocketbase";
const pb = new Pocketbase('http://127.0.0.1:8090')

export async function allUser() {
    try {
        let data = await pb.collection('USER').getFullList();
        data = data.map((user) => {
            user.image_URL = pb.files.getURL(user, user.image);
            return user;
        })
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la collection USER');
        return null;
    }
}