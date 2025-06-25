import { Octokit } from "octokit";
import dotenv from "dotenv";
import fs, { stat } from "fs";
import { getEmotionUrl, tamagitchi } from "./tamagitchi.mjs";
import stats from "./stats.json" with {type: "json"};

// !! add your username and the name of the repo you'd like to highlight
const username = "idksarah";
const highlightedRepo = "tamagitchi";

// !! add your own README content here! make sure it's html 
const otherContent= `<h1> hi!! i'm sarah</h1>
<p> i. do not know what i'm doing! </p>
<p> find me on the hackclub slack @idksarah!</p>
<hr class="solid">`;

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const DAY = 24 * 60 * 60 * 1000; 

const excitedContent=`
<p>octocat is feeling excited because ${username} received a star on <i>${highlightedRepo}</i>!</p>
<p>petting them can't make them any happier, but it sure will make ${username} happy! (<a href="https://github.com/${username}/${highlightedRepo}">star ${username}'s ${highlightedRepo}!! ⭐</a>)</p>`;
const happyContent=`
<p>octocat is feeling happy because ${username} has made >= one commit today!</p>
<p>pet them to make them excited! (<a href="https://github.com/${username}/${highlightedRepo}">star ${username}'s ${highlightedRepo}!! ⭐</a>)</p>`;
const neutralContent=`
<p>octocat is feeling neutral because ${username} hasn't made a commit <i>today</i> but has made >= one commit in the <i>past three days</i>.</p>
<p>pet them to make them excited! (<a href="https://github.com/${username}/${highlightedRepo}">star ${username}'s ${highlightedRepo}!! ⭐</a>)</p>`;
const sadContent=`
<p>octocat is feeling excited because ${username} hasn't had any activity in the <i>past three days</i>.</p>
<p>pet them to make them excited! (<a href="https://github.com/${username}/${highlightedRepo}">star ${username}'s ${highlightedRepo}!! ⭐</a>)</p>`;

let userRes, repoRes;

const main = async () => {
    userRes = await octokit.rest.users.getByUsername({username});

    repoRes = await octokit.rest.repos.get({
         owner: `${userRes.data.login}`,
         repo: highlightedRepo
    });

    console.log("repo star count: " + repoRes.data.stargazers_count);
    console.log("stats star count: " + stats.stargazers_count);

     if (repoRes.data.stargazers_count > stats.stargazers_count){
        tamagitchi.pet.emotion = "excited";
    } else {
        const publicActivity = await octokit.rest.activity.listPublicEventsForUser({
            username: `${userRes.data.login}`,
            per_page: 15 
        });

        let recentAct = [], olderAct = [];

        publicActivity.data.forEach(event => {
            let date = new Date(event.created_at);
            if(date.getTime() >= (Date.now() - (DAY))){
                recentAct.push(event);
            } else if (date.getTime() >= (Date.now() - 3 * DAY)){
                olderAct.push(event);
            }
        })

        if (recentAct.length != 0) {if(recentAct.length >= 1){
            tamagitchi.pet.emotion = "happy";
            } 
        } else {
            if (olderAct.length == 0 ){ 
                tamagitchi.pet.emotion = "sad";
            } else {
                tamagitchi.pet.emotion = "neutral";
            }
        }
    }

    updateStats();
    updateReadme(tamagitchi.pet.emotion, getEmotionUrl(tamagitchi.pet.emotion));

    console.log("emotion: " + tamagitchi.pet.emotion);
};

function updateStats(){
    stats.stargazers_count = repoRes.data.stargazers_count;
    console.log("file syncin json");
    fs.writeFileSync("./src/stats.json", JSON.stringify(stats, null, 2));
}

function updateReadme(emotion, url){
    let emotionContent;
    switch (emotion){
        case "excited":
            emotionContent = excitedContent;
            break;
        case "happy":
            emotionContent = happyContent;
            break;
        case "neutral":
            emotionContent = neutralContent;
            break;
        case "sad":
            emotionContent = sadContent;
    }
    const time = Date().toString().toLowerCase().substring(16,21);
    const readMeContent = `${otherContent}
<div align="center">
<img style="width: 50em;" src="${url}" alt="tamagitchi" /><br>
${emotionContent}

<p>last updated: ${time} utc | tamagitchi updates once an hour. check back soon! </p>
</div>`;
    fs.writeFileSync("./profile-repo/README.md", readMeContent);
}
main();