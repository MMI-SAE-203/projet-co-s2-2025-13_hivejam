//Dépendences
import fs from 'fs';
import path from 'path';

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
            game_jam,
            "users": userid
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

export async function addTask(data, teamid) {
    try {
        
        const task = await pb.collection('TASK').create(data);

        const teamRecord = await pb.collection("TEAM").getOne(teamid);
        await pb.collection("TEAM").update(teamid, { task: [...teamRecord.task, task.id] });

        return {
            success: true,
            message: "La Jam a bien été créer.",
            redirect: `/mes_jams/${teamid}`
        }
    } catch (error) {
        return {
            success: false,
            message: "Il y a eu un problème lors de la création de la jam : " + error,
            redirect: `/mes_jams/${teamid}?error`
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
                team.time = status.time;
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

// //Fonction pour récupérer la liste de toutes les jams triées par popularité et par status
// //Il y a deux paramètre possible pour la fonction, popular (boolean) et time ("past", "present" ou "future")
export async function getAllJamFiltered(popular, time) {
    try {
        //Récupère toutes les jams
        const jams = await pb.collection('GAME_JAM').getFullList();

        //Récupère toutes les teams
        const teams = await pb.collection('TEAM').getFullList({
            expand: 'game_jam'
        });

        //comptage des teams pour chaque jam
        const teamCounts = teams.reduce((acc, team) => {
            const jamID = team.expand.game_jam?.id;
            if (jamID) {
                acc[jamID] = (acc[jamID] || 0) + 1;
            }
            return acc;
        }, {});

        // Step 4: Filter and map jams, including those with zero teams
        let filteredJams = jams
            .map(jam => {
                const jamStatus = getJamStatus(jam);
                if (time && jamStatus.time !== time) return null;

                return {
                    ...jam,
                    team_NB: teamCounts[jam.id] || 0,
                    image_URL: pb.files.getURL(jam, jam.image),
                    time_info: jamStatus.info,
                    time: jamStatus.time
                };
            })
            .filter(Boolean); // remove nulls

        // Step 5: Sort by popularity if needed
        if (popular) {
            filteredJams.sort((a, b) => b.team_NB - a.team_NB);
        } else {
            filteredJams.sort((a, b) => a.team_NB - b.team_NB);
        }

        return filteredJams;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les collections GAME_JAM ou TEAM');
        return null;
    }
}

//Fonction pour charger des posts par page, nécessite le paramètre currentPage qui est le numéro de la page
//Fonction à utiliser sur la homepage et sur la page forum autant pour le chargement initial que pour charger plus de posts
export async function getSomePost(currentpage, nbrOfPost) {
    try {
        let postsList = await pb.collection('POST').getList(currentpage, nbrOfPost, {
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
        return {"posts" : posts, "totalPages": postsList.totalPages};
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
        post.comment_NB = await getPostCommentNB(post.id);
        return post;
    } catch (error) {
        console.log('Une erreur est survenue en lisant des entrées dans la collection POST');
        return null;
    }
}

//Fonction pour la page de team
//Pour accéder aux infos de la jam .expand.game_jam.time_info par exemple
//Pour accéder aux infos des tâches .task[0].name par exemple
//Pour accéder aux infos d'un user lié à une task .task[0].expand.user.image_URL par exemple
//c'est un peu long et dégueu mais ça passe, task est un array hein
export async function getTeamBoard(id) {
    try {
        let team = await pb.collection('TEAM').getOne(id, { expand: 'game_jam, users' });
        let status = getJamStatus(team.expand.game_jam);
        team.time_info = status.info;
        team.time = status.time;
        for (let i in team.task) {
            team.task[i] = await pb.collection('TASK').getOne(team.task[i], { expand: 'user' });
            for (let j in team.task[i].expand.user) {
                team.task[i].expand.user[j].image_URL = pb.files.getURL(team.task[i].expand.user[j], team.task[i].expand.user[j].image)
            }
        }
        for (let i in team.expand.users) {
            team.expand.users[i].image_URL = pb.files.getURL(team.expand.users[i], team.expand.users[i].image)
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
        const status = getJamStatus(jam);
        jam.time_info = status.info;
        jam.time = status.time;
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
    let timeInfo;

    const formatDate = (date) => {
        return date.toLocaleString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCountdown = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    if (now < start) {
        status = 'future';
        timeInfo = `Commencera le ${formatDate(start)}`;
    } else if (now >= start && now <= end) {
        status = 'present';
        const remaining = end - now;
        timeInfo = formatCountdown(remaining);
    } else {
        status = 'past';
        timeInfo = `Terminé le ${formatDate(end)}`;
    }

    return {
        time: status,
        info: timeInfo
    };
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


//____________________________________upload des jeux en ligne_________________________________________________

export async function addGame(gameData) {
    try {
        //Création de l'entrée dans PocketBase
        const game = await pb.collection("GAME").create(gameData);
        //Si une version web a été fournie
        if (game.file_web) {
            //Appel de l'API custom
            const response = await fetch('https://hivejam-games.paolo-vincent.fr/extract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recordId: game.id,
                    zipUrl: pb.files.getURL(game, game.file_web)
                })
            });
            //Ajout de l'url du jeu dans PocketBase
            await pb.collection('GAME').update(game.id, { web_URL: `https://hivejam-games.paolo-vincent.fr/${game.id}/` });
            console.log(response.text());
            return response
        }
    } catch (error) {
        console.error('Une erreur est survenue en ajoutant une entrée dans la collection GAME', error);
        return null;
    }
}