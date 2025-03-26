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

export async function addGame(game) {
    try {
        //récupération de l'URL de l'image comme d'habitude
        if (game.image) {
            game.image_URL = pb.files.getURL(game, game.image);
        }
        //vérification du fichier web et magouille derrière
        if (game.file_web) {
            console.log("web file found");
            //récupère l'URL du fichier
            const file_web_URL = pb.files.getURL(game, game.file_web);

            //transformation du fichier en blob pour JSZip
            const response = await fetch(file_web_URL);
            const blob = await response.blob();

            //chargement du fichier dans JSZip
            const zip = await JSZip.loadAsync(blob);
            console.log("ZIP file loaded");

            //préparation du dossier qui va être créer pour le jeu dans pb_public, solution temporaire !
            const gameFloder = (Math.floor(Math.random() * 10000)).toString()

            //loop sur les fichiers dans le zip
            zip.forEach(async (relativePath, file) => {
                //préparation du fichier
                const content = await file.async('blob');
                const fileName = relativePath;

                
            })

        } else {
            console.log("web file not found")
        }
        await pb.collection("GAME").create(game);

    } catch (error) {
        console.log('Une erreur en ajoutant une entrée dans la collection GAME');
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

