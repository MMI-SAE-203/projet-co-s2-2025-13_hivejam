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
//pour accéder aux infos de la jam il faut .expand.game_jam
export async function getUserTeams(userid) {
    try {
        let user = await pb.collection('USER').getOne(userid);
        let idfilter = [];
        user.team.forEach(id => {
            let single_filter = `id = "${id}"`
            idfilter.push(single_filter);
        });
        idfilter = idfilter.join(' || ');
        let teams = await pb.collection('TEAM').getFullList({filter : `${idfilter}`, expand: "game_jam"});
        let teams_sorted = {
            "past" : [],
            "present" : [],
            "future" : [],
        }
        teams.forEach(team => {
            team.image_URL = pb.files.getURL(team.expand.game_jam, team.expand.game_jam.image)
            let status = getJamStatus(team.expand.game_jam);
            team.time_info = status.info;
            teams_sorted[status.time].push(team);
        });
        return teams_sorted;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection USER');
        return null;
    }
}

//Fonction pour savoir si une jam est en cours, terminée ou à venir
function getJamStatus(jam) {
    const now = new Date();
    const start = new Date(jam.date_beginning);
    const end = new Date(start.getTime() + jam.duration * 60 * 60 * 1000);

    let status;
    let timeDiff;
    let timeInfo;

    //Transforme la différence de temps en un truc lisible en mois, semaines, jours etc en fonction
    const msToTime = (timeDiff) => {
        const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)); // 30 days in a month
        const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7)); // 7 days in a week
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 1 day in ms
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        if (months > 0) return `${months} mois`;
        if (weeks > 0) return `${weeks} semaines`;
        if (days > 0) return `${days} jours`;
        if (hours > 0) return `${hours} heures`;
        return `${minutes} minutes`;
    };

    if (now < start) {
        // Si c'est dans le futur
        status = 'future';
        timeDiff = start - now;
        timeInfo = `Cette jam commencera dans ${msToTime(timeDiff)}`;
    } else if (now >= start && now <= end) {
        // Si c'est en cours
        status = 'present';
        timeDiff = end - now;
        timeInfo = `${msToTime(timeDiff)} avant la fin de cette jam`;
    } else {
        // Si c'est terminé
        status = 'past';
        timeDiff = now - end;
        timeInfo = `Cette jam s'est terminé il y a ${msToTime(timeDiff)}`;
    }

    let response = {
        "time": status,
        "info": timeInfo
    };
    return response;
}

//Fonction qui retourne quelques posts récents à afficher sur la homepage
//image_URL = "" si le post ne contient pas d'image
//pour accéder aux infos de l'utilisateur il faut .expand.user
export async function getRecentPost() {
    try {
        let postsList = await pb.collection('POST').getList(1,10, {
            sort : 'created',
            expand : 'user'
        });
        let posts = postsList.items;
        posts.forEach(post => {
            post.image_URL = pb.files.getURL(post, post.image);
            post.comment_NB = post.comment.length;
            post.expand.user.image_URL = pb.files.getURL(post.expand.user, post.expand.user.image);
          });
        return posts;
    } catch (error) {
        console.log('Une erreur est survenue en lisant des entrées dans la collection POST');
        return null;
    }
}

//Fonction qui retourne les jams à venir et en cours les plus populaires
// export async function getGame(id) {
//     try {
//         let game = await pb.collection('GAME').getOne(id);
//         game.image_URL = pb.files.getURL(game, game.image);
//         return game;
//     } catch (error) {
//         console.log('Une erreur est survenue en lisant des entrées dans la collection GAME');
//         return null;
//     }
// }


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