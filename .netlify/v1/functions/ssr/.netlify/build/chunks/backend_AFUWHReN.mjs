import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import axios from 'axios';
import PocketBase from 'pocketbase';

//Dépendences
const pb = new PocketBase('https://hivejam.paolo-vincent.fr:443/');

async function getTeam(id) {
    try {
        let team = await pb.collection('TEAM').getOne(id, { expand: 'game_jam' });
        return team;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection TEAM');
        return null;
    }
}

async function getJam(id) {
    try {
        let jam = await pb.collection('GAME_JAM').getOne(id, { expand: "host" && "games" });
        jam.image_URL = pb.files.getURL(jam, jam.image);
        return jam;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection GAME_JAM');
        return null;
    }
}

async function getGame(id) {
    try {
        let game = await pb.collection('GAME').getOne(id);
        game.image_URL = pb.files.getURL(game, game.image);
        return game;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection GAME');
        return null;
    }
}

async function addJam(data, username, userid) {
    try {
        const jam = await pb.collection("GAME_JAM").create(data);

        const name = "Équipe de " + username;
        const game_jam = jam.id;
        const team = await pb.collection("TEAM").create({
            name,
            game_jam
        });

        const userRecord = await pb.collection("users").getOne(userid);
        await pb.collection("users").update(userid, { team: [...userRecord.team, team.id] });

        return {
            success: true,
            message: "La Jam a bien été créer.",
            redirect: `/mes_jams/${team.id}`
        }
    } catch (error) {
        return {
            success: false,
            message: "Il y a eu un problème lors de la création de la jam : " + error,
            redirect: `/creer?error}`
        }
    }
}

//_______________________________________________________Fonctions spécifiques_____________________________________________

//Fonction pour récupérer les teams de l'utilisateurs donc ses participations aux jams
//renvoie un object d'array avec les key "past", "present" et "future"
//pour accéder aux infos de la jam il faut .expand.game_jam
async function getUserTeams(userid) {
    try {
        let user = await pb.collection('users').getOne(userid, { field: 'team' });
        let idfilter = [];
        user.team.forEach(id => {
            let single_filter = `id = "${id}"`;
            idfilter.push(single_filter);
        });
        idfilter = idfilter.join(' || ');
        if (idfilter) {
            let teams = await pb.collection('TEAM').getFullList({ filter: `${idfilter}`, expand: "game_jam" });
            let teams_sorted = {
                "past": [],
                "present": [],
                "future": [],
            };
            teams.forEach(team => {
                team.image_URL = pb.files.getURL(team.expand.game_jam, team.expand.game_jam.image);
                let status = getJamStatus(team.expand.game_jam);
                team.time_info = status.info;
                teams_sorted[status.time].push(team);
            });
            return teams_sorted;
        } else {
            return null;
        }
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection USER');
        return null;
    }
}

//Fonction pour récupérer la liste de toutes les jams triées par popularité et par status
//Il y a deux paramètre possible pour la fonction, popular (boolean) et time ("past", "present" ou "future")
async function getAllJamFiltered(popular, time) {
    try {
        let teams = await pb.collection('TEAM').getFullList({
            expand: 'game_jam'
        });

        //Compte combien de teams sont associées à chaque jam et les infos de timing (genre : commence dans 2 mois)
        const jamTeamCountandInfo = teams.reduce((accumulator, team) => {
            const jam = team.expand.game_jam;
            const jamID = jam.id;
            const jamStatus = getJamStatus(jam);
            if (time) {
                if (jamStatus.time === time) {
                    if (!accumulator[jamID]) {
                        accumulator[jamID] = {
                            teamCount: 0,
                            info: jamStatus.info
                        };
                    }
                    accumulator[jamID].teamCount++;
                }
            } else {
                if (!accumulator[jamID]) {
                    accumulator[jamID] = {
                        teamCount: 0,
                        info: jamStatus.info
                    };
                }
                accumulator[jamID].teamCount++;
            }

            return accumulator;
        }, {});

        //Récupère les jams avec le plus de teams et le nombre de teams
        const topJams = Object.entries(jamTeamCountandInfo)
            .sort((a, b) =>
                popular ? b[1].teamCount - a[1].teamCount : a[1].teamCount - b[1].teamCount
            )
            .map(([id, data]) => ({
                id,
                count: data.teamCount,
                info: data.info
            }));

        const jams = [];
        //Récupère le jam et lui ajoute le nombre de team et l'URL de l'image d'illustration
        for (const element of topJams) {
            const jam = await getJam(element.id);
            jam.team_NB = element.count;
            jam.image_URL = pb.files.getURL(jam, jam.image);
            jam.time_info = element.info;
            jams.push(jam);
        }

        return jams;
    } catch (error) {
        console.log('Une erreur est survenue en lisant des entrée dans la collection TEAM');
        return null;
    }
}

//Fonction pour récupérer les infos nécessaires à la page d'un jam
async function getJamPage(id) {
    try {
        let jam = await pb.collection('GAME_JAM').getOne(id, { expand: 'games' });
        jam.image_URL = pb.files.getURL(jam, jam.image);
        jam.time_info = getJamStatus(jam).info;
        for (let i in jam.expand.games) {
            jam.expand.games[i].image_URL = pb.files.getURL(jam.expand.games[i], jam.expand.games[i].image);
        }
        return jam
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection GAME_JAM');
        return null;
    }
}

//______________________________________________________librairie perso____________________________________________________

//Fonction pour savoir si une jam est en cours, terminée ou à venir
//renvoie un object repsonse avec .time un string past,present ou future et .info une phrase donnant une indication temporelle sur la jam
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


//____________________________________upload des jeux en ligne (test)_________________________________________________



//_____________________________________upload des jeux local (temporaire)________________________________________________

//Grosses fonctions pour uploader les jeux, utilisée en locale, la solution finale sera différente
//La première créer l'entrée dans Pocketbase
async function addGame(gameData) {
    try {
        //Création de l'entrée dans pocketbase
        if (gameData != null) {
            const game = await pb.collection("GAME").create(gameData);
            //Vérifie s'il ya un fichier dans file_web
            if (game.file_web) {
                const uploadedFileURL = pb.files.getURL(game, game.file_web);
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
//Deuxième fonction sert à extraire les fichiers
async function extractGameFile(id, uploadedFileURL) {
    try {
        //Récupère le fichier
        const filePath = await downloadFile(uploadedFileURL, id);
        const extname = path.extname(filePath).toLowerCase();
        const extractionDestDir = path.join('public','games', id);
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
    console.log('downloading files');
    try {
        const response = await axios({
            method: 'get',
            url: fileUrl,
            responseType: 'stream', // Important for large files
        });
        const filePath = path.join('public','tmp', `${gameId}.zip`); // Temp file path
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

export { addJam as a, addGame as b, getTeam as c, getUserTeams as d, getJamPage as e, getAllJamFiltered as f, getGame as g };
