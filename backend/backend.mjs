import JSZip from "jszip";
import Pocketbase from "pocketbase";
const pb = new Pocketbase('http://127.0.0.1:8090')


export async function getUser(id) {
    try {
        let user = await pb.collection('USER').getOne(id);
        user.image_URL = pb.files.getURL(user, user.image);
        return user;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection USER');
        return null;
    }
}

export async function getTeam(id) {
    try {
        let team = await pb.collection('TEAM').getOne(id);
        return team;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection TEAM');
        return null;
    }
}

export async function getGame(id) {
    try {
        let game = await pb.collection('GAME').getOne(id);
        return game;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection GAME');
        return null;
    }
}

export async function allPost() {
    try {
        let data = await pb.collection('POST').getList(1,50, {
            sort: "-created"
        });
        data.items = data.items.map((post) => {
            if (post.image) {
                post.image_URL = pb.files.getURL(post, post.image);
            }
            return post;
        })
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la collection POST');
        return null;
    }
}

//Grosses fonctions pour uploader les jeux
export async function addGame(game) {
    try {
        //Création de l'entrée dans pocketbase
        await pb.collection("GAME").create(game);
        //Appelle la fonction pour extraire les fichiers dans 
    } catch (error) {
        console.log('Une erreur en ajoutant une entrée dans la collection GAME');
        return null;
    }
}



