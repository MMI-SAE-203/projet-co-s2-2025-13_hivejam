//Dépendences
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import axios from 'axios';

import Pocketbase from "pocketbase";
const pb = new Pocketbase('https://hivejam.paolo-vincent.fr:443/')

//fonctions get génériques pour récupérer une entrée avec un id

export async function getUser(id) {
    try {
        let user = await pb.collection('users').getOne(id);
        user.image_URL = pb.files.getURL(user, user.image);
        return user;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection USER');
        return null;
    }
}

export async function getTeam(id) {
    try {
        let team = await pb.collection('TEAM').getOne(id, { expand: 'game_jam' });
        return team;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection TEAM');
        return null;
    }
}

export async function getTask(id) {
    try {
        let task = await pb.collection('TASK').getOne(id, { expand: "user" });
        return task;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection TASK');
        return null;
    }
}

export async function getPost(id) {
    try {
        let post = await pb.collection('POST').getOne(id, { expand: 'user' });
        post.image_URL = pb.files.getURL(post, post.image);
        post.expand.user.image_URL = pb.files.getURL(post.expand.user, post.expand.user.image);
        return post;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection POST');
        return null;
    }
}

export async function getJam(id) {
    try {
        let jam = await pb.collection('GAME_JAM').getOne(id, { expand: "host" && "games" });
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
        let comment = await pb.collection('COMMENT').getOne(id, { expand: 'user' });
        comment.expand.user.image_URL = pb.files.getURL(comment.expand.user, comment.expand.user.image);
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
        article.date = formatDateFull(article.created);
        return article;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection ARTICLE');
        return null;
    }
}

export async function addJam(data, username, userid) {
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
export async function getUserTeams(userid) {
    try {
        let user = await pb.collection('users').getOne(userid, { field: 'team' });
        let idfilter = [];
        user.team.forEach(id => {
            let single_filter = `id = "${id}"`
            idfilter.push(single_filter);
        });
        idfilter = idfilter.join(' || ');
        if (idfilter) {
            let teams = await pb.collection('TEAM').getFullList({ filter: `${idfilter}`, expand: "game_jam" });
            let teams_sorted = {
                "past": [],
                "present": [],
                "future": [],
            }
            teams.forEach(team => {
                team.image_URL = pb.files.getURL(team.expand.game_jam, team.expand.game_jam.image)
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

//Fonction qui retourne les jams à venir et en cours les plus populaires
export async function getPopularJam() {
    try {
        //Récupère toutes les teams lié à des jams à venir
        const now = Date.now();
        let teams = await pb.collection('TEAM').getFullList({
            expand: 'game_jam',
            filter: `game_jam.date_beginning >= ${now}`
        });
        //Compte combien de teams sont associées à chaque jam
        const jamTeamCount = teams.reduce((accumulator, team) => {
            const jamID = team.expand.game_jam.id;
            if (!accumulator[jamID]) {
                accumulator[jamID] = 0;
            }
            accumulator[jamID]++;
            return accumulator;
        }, {});
        //Récupère les 5 jams avec le plus de teams et le nombre de teams
        const topJams = Object.entries(jamTeamCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id, count]) => ({ id, count }));

        const jams = [];
        //Récupère le jam et lui ajoute le nombre de team et l'URL de l'image d'illustration
        for (const element of topJams) {
            const jam = await getJam(element.id);
            jam.team_NB = element.count;
            jam.image_URL = pb.files.getURL(jam, jam.image);
            jams.push(jam);
        }
        return jams;
    } catch (error) {
        console.log('Une erreur est survenue en lisant des entrées dans la collection TEAM');
        return null;
    }
}

//Fonction qui retourne les 5 derniers articles
// .date pour avoir la date de publication écrite
export async function getRecentArticle() {
    try {
        let articlesList = await pb.collection('ARTICLE').getList(1, 5, {
            sort: '-created'
        });
        let articles = articlesList.items;
        articles.forEach(article => {
            article.date = formatDate(article.created)
        });
        return articles;
    } catch (error) {
        console.log('Une erreur est survenue en lisant des entrées dans la collection ARTICLE');
        return null;
    }
}

//Fonction pour récupérer tous les articles
export async function getAllArticle() {
    try {
        let articles = await pb.collection('ARTICLE').getFullList({
            sort: '-created'
        });
        articles.forEach(article => {
            article.date = formatDate(article.created);
            article.image_URL = pb.files.getURL(article, article.image);
        });
        return articles;
    } catch (error) {
        console.log('Une erreur est survenue en lisant des entrées dans la collection ARTICLE');
        return null;
    }
}

//Fonction pour récupérer une liste d'article sur le même topic
//Pour récupérer l'article en lui même simplement utiliser getArticle
export async function getSimilarArticle(topic) {
    try {
        let articles = await pb.collection('ARTICLE').getFullList({
            sort: '-created',
            filter: `topic = "${topic}"`
        });
        articles.forEach(article => {
            article.date = formatDate(article.created);
            article.image_URL = pb.files.getURL(article, article.image);
        });
        return articles;
    } catch (error) {
        console.log('Une erreur est survenue en lisant des entrées dans la collection ARTICLE');
        return null;
    }
}

//Fonction pour récupérer la liste de toutes les jams triées par popularité et par status
//Il y a deux paramètre possible pour la fonction, popular (boolean) et time ("past", "present" ou "future")
export async function getAllJamFiltered(popular, time) {
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

//Fonction pour charger des posts par page, nécessite le paramètre currentPage qui est le numéro de la page
//Fonction à utiliser sur la homepage et sur la page forum autant pour le chargement initial que pour charger plus de posts
export async function getSomePost(currentpage) {
    try {
        let postsList = await pb.collection('POST').getList(currentpage, 20, {
            sort: '-created',
            expand: 'user'
        });
        let posts = postsList.items;
        posts.forEach(post => {
            post.image_URL = pb.files.getURL(post, post.image);
            post.expand.user.image_URL = pb.files.getURL(post.expand.user, post.expand.user.image);
        });
        for (let post of posts) {
            post.comment_NB = await getPostCommentNB(post.id);
        }
        return posts;
    } catch (error) {
        console.log('Une erreur est survenue en lisant des entrées dans la collection POST');
        return null;
    }
}

//Fonction qui récupère quelques réponses récentes
export async function getRecentComment(userId) {
    try {
        let userComments = await pb.collection('COMMENT').getFullList({
            sort: '-created',
            filter: `user = '${userId}'`
        })
        let comments = [];
        for (let i in userComments) {
            for (let j in userComments[i].comment) {
                let comment = await pb.collection('COMMENT').getOne(userComments[i].comment[j], { expand: 'user' });
                comment.expand.user.image_URL = pb.files.getURL(comment.expand.user, comment.expand.user.image);
                comments.push(comment);
            }
            if (comments.length > 5) {
                break
            }
        }
        return comments
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection COMMENT');
        return null;
    }
}

//Fonction pour la page d'un post, pour accéder aux commentaires c'est juste .comment, pas besoin du expand
//Si un commentaire à lui même des commentaires alors il a un array .comment lui aussi et ça s'enchaîne en mode arbre
export async function getPostPage(id) {
    try {
        let post = await getPost(id);
        post.comment = await getCommentTree(post.comment);
        return post;
    } catch (error) {
        console.log('Une erreur est survenue en lisant des entrées dans la collection POST');
        return null;
    }
}

//Fonction pour la page de team
//Pour accéder aux infos de la jam .expand.game_jam.time_info par exemple
//Pour accéder aux infos des tâches .expand.task[0].name par exemple
//Pour accéder aux infos d'un user lié à une task .expand.task[0].expand.user.image_URL par exemple
//c'est un peu long et dégueu mais ça passe, task est un array hein
export async function getTeamBoard(id) {
    try {
        let team = await pb.collection('TEAM').getOne(id, { expand: 'game_jam' });
        team.expand.game_jam.time_info = getJamStatus(team.expand.game_jam).info;

        for (let i in team.task) {
            team.task[i] = await pb.collection('TASK').getOne(team.task[i], { expand: 'user' });
            for (let j in team.task[i].expand.user) {
                team.task[i].expand.user[j].image_URL = pb.files.getURL(team.task[i].expand.user[j], team.task[i].expand.user[j].image)
            }
        }

        return team;
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection TEAM');
        return null;
    }
}

//Fonction pour récupérer les infos nécessaires à la page d'un jam
export async function getJamPage(id) {
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

//Fonction pour récupérer les infos nécessaires à la page d'un jeux, pour l'instant pas jouable
// lien de téléchargement du jeu s'il existe .file_dl_URL
//Infos sur la team et sur la jam dans le expand
export async function getGamePage(id) {
    try {
        let game = await pb.collection('GAME').getOne(id, { expand: 'team' });
        game.image_URL = pb.files.getURL(game, game.image);
        if (game.file_dl) {
            game.file_dl_URL = pb.files.getURL(game, game.file_dl);
        }
        game.expand.game_jam = await pb.collection('GAME_JAM').getOne(game.expand.team.game_jam, { fields: 'id, name, theme' })
        return game
    } catch (error) {
        console.log('Une erreur est survenue en lisant une entrée dans la collection GAME');
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

//Formatage d'une date iso en 00 mois
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
}

//Formatage d'une date iso en 00 mois 0000
function formatDateFull(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

//Fonction qui renvoie le nombre de commentaires d'un post via son id
export async function getPostCommentNB(postId) {
    let total = 0;

    const post = await pb.collection('POST').getOne(postId, {
        expand: 'comment',
        fields: 'id,expand.comment'
    });

    const directComments = post.expand?.comment || [];

    for (const comment of directComments) {
        total += 1;
        total += await getRecursiveCommentNB(comment.id);
    }

    return total;
}

//Fonction qui renvoie le nombre de commentaires d'un commentaires récursivement
export async function getRecursiveCommentNB(id) {
    let NB = 0;
    let commentData = await pb.collection('COMMENT').getOne(id, { expand: 'comment' });;

    if (!commentData || !commentData.expand.comment) {
        return 0;
    }

    commentData = commentData.expand.comment;

    for (const comment of commentData) {
        NB += 1; // count this comment
        NB += await getRecursiveCommentNB(comment.id); // add nested replies
    }
    return NB;
}

//Fonction qui construit un arbre de commentaire à partir d'un array d'id de commentaires, récursivement
export async function getCommentTree(comments) {
    for (let i in comments) {
        comments[i] = await getComment(comments[i]);
        comments[i].comment = await getCommentTree(comments[i].comment);
    }
    return comments
}


//____________________________________upload des jeux en ligne (test)_________________________________________________



//_____________________________________upload des jeux local (temporaire)________________________________________________

//Grosses fonctions pour uploader les jeux, utilisée en locale, la solution finale sera différente
//La première créer l'entrée dans Pocketbase
export async function addGame(gameData) {
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
    console.log('downloading files')
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