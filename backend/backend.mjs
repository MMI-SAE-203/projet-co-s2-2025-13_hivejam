//Dépendences
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import axios from 'axios';

import Pocketbase from "pocketbase";
const pb = new Pocketbase('http://127.0.0.1:8090')

//fonctions get génériques pour récupérer une entrée avec un id

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

export async function getTask(id) {
    try {
        let task = await pb.collection('TASK').getOne(id, {expand : "user"});
        return task;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection TASK');
        return null;
    }
}

export async function getPost(id) {
    try {
        let post = await pb.collection('POST').getOne(id);
        post.image_URL = pb.files.getURL(post, post.image);
        return post;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection POST');
        return null;
    }
}

export async function getJam(id) {
    try {
        let jam = await pb.collection('GAME_JAM').getOne(id, {expand: "host" && "games"});
        jam.image_URL = pb.files.getURL(jam, jam.image);
        return jam;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection GAME_JAM');
        return null;
    }
}

export async function getGame(id) {
    try {
        let game = await pb.collection('GAME').getOne(id);
        game.image_URL = pb.files.getURL(game, game.image);
        return game;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection GAME');
        return null;
    }
}

export async function getComment(id) {
    try {
        let comment = await pb.collection('COMMENT').getOne(id);
        return comment;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection COMMENT');
        return null;
    }
}

export async function getArticle(id) {
    try {
        let article = await pb.collection('ARTICLE').getOne(id);
        article.image_URL = pb.files.getURL(article, article.image);
        return article;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection ARTICLE');
        return null;
    }
}

//Fonction pour récupérer les teams de l'utilisateurs donc ses participations aux jams
//renvoie un object d'array avec les key "past", "present" et "future"
export async function getUserTeams(userid) {
    try {
        let user = await pb.collection('USER').getOne(userid);
        let idfilter = [];
        user.team.forEach(id => {
            let singlefilter = `id = "${id}"`
            idfilter.push(singlefilter);
        });
        idfilter = idfilter.join(' || ');
        console.log(idfilter);
        let teams = await pb.collection('TEAM').getFullList({filter : `${idfilter}`});
        return teams;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection USER');
        return null;
    }
}





//Grosses fonctions pour uploader les jeux, utilisée en locale, la solution finale sera différente
//La première créer l'entrée dans Pocketbase
export async function addGame(gameData) {
    try {
        //Création de l'entrée dans pocketbase
        if (gameData != null) {
            const game = await pb.collection("GAME").create(gameData);
            //Vérifie s'il ya un fichier dans file_web
            if (game.file_web) {
                const uploadedFileURL = await pb.files.getURL(game, game.file_web);
                console.log(uploadedFileURL);
                await extractGameFile(game.id, uploadedFileURL);
            }
        } else {
            console.log('Les informations fournies sont nulles');
        }
        //Appelle la fonction pour extraire les fichiers dans 
    } catch (error) {
        console.error('Une erreur est survenue en ajoutant une entrée dans la collection GAME', error);
        return null;
    }
}
//Deuxième fonction sert à extraire les fichiers et les publier dans le dossier public
async function extractGameFile(id, uploadedFileURL) {
    try {
        //Récupère le fichier
        const filePath = await downloadFile(uploadedFileURL, id);
        const extname = path.extname(filePath).toLowerCase();
        const extractionDestDir = path.join('public', 'games', id);
        fs.mkdirSync(extractionDestDir, { recursive: true });

        if (extname == '.zip') {
            const zip = new AdmZip(filePath);
            zip.extractAllTo(extractionDestDir, true);
            console.log(`Fichier ZIP extrait vers : ${extractionDestDir}`);
        } else {
            console.error('Type de fichier non reconnu : ', extname);
            return;
        }

        //Update l'entrée Pocketbase
        await pb.collection('GAME').update(id, { "file_path": `/games/${id}/index.html` });

    } catch (error) {
        console.error('Une erreur est survenue en essayant d extraire les fichiers du jeu');
    }
}
//Troisième fonction télécharge le fichier depuis pocketbase
async function downloadFile(fileUrl, gameId) {
    console.log('downloading files')
    try {
        const response = await axios({
            method: 'get',
            url: fileUrl,
            responseType: 'stream', // Important for large files
        });
        const filePath = path.join('public', 'tmp', `${gameId}.zip`); // Temp file path
        console.log(filePath);
        const writer = fs.createWriteStream(filePath);
        // Pipe the response stream to the file
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(filePath));
            writer.on('error', reject);
        });

    } catch (error) {
        console.error('Error downloading the file:', error);
    }
}