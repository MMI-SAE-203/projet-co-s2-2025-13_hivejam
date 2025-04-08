//Dépendences
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import axios from 'axios';
import fsExtra from 'fs-extra';
import { fileURLToPath } from 'url';
import path from 'path';

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
        let data = await pb.collection('POST').getList(1, 50, {
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
        //Détermine le type (zip ou rar)
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
        await pb.collection('GAME').update(id, { "file_URL": `games/${id}/index.html` });

    } catch (error) {
        console.error('Une erreur est survenue en essayant d extraire les fichiers du jeu');
    }
}

//Troisième fonction télécharge le fichier depuis pocketbase
//Fonction créée par chat auquelle j'ai pas touché
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