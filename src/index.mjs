import { Octokit } from "octokit";
import dotenv from "dotenv";
import fs from "fs";
import { getEmotionUrl, tamagitchi } from "./tamagitchi.mjs";
import stats from "./stats.json" with {type: "json"};

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const DAY = 24 * 60 * 60 * 1000; 

// !! edit this to your username and the name of the repo you'd like to highlight
const username = "idksarah";
const highlightedRepo = "tamagitchi";

// !! edit this to add your own README content!
const otherContent= `<h1> hi!! i'm sarah</h1>
<p> i like coding. sometimes :3 </p>
<p> find me on the hackclub slack @idksarah!</p>
<hr class="solid">`;

const excitedContent=`
<p>octocat is feeling excited because ${username} received a follow or star!</p>
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

const main = async () => {
    const userRes = await octokit.rest.users.getByUsername({username});

    const publicActivity = await octokit.rest.activity.listPublicEventsForUser({
        username: `${userRes.data.login}`,
        per_page: 10
    });

    const repoRes = await octokit.rest.repos.get({
         owner: `${userRes.data.login}`,
         repo: highlightedRepo
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

    // sort activity into emotions
    if (recentAct.length != 0){
        if (userRes.data.followers > stats.followers || repoRes.data.stargazers_count > stats.stargazers_count){
            tamagitchi.pet.emotion = "excited";
        } else if(recentAct.length >= 1){
            if(recentAct.length >= 10){
                tamagitchi.pet.emotion = "excited";
            } else {
                tamagitchi.pet.emotion = "happy";
            }
        } 
    } else {
        if (olderAct.length == 0 ){ 
            tamagitchi.pet.emotion = "sad";
        } else {
            tamagitchi.pet.emotion = "neutral";
        }
    }

    // update stats.json
    if (Date.now() > (stats.lastUpdated + DAY)){
        stats.lastUpdated = Date.now();
        stats.followers = userRes.data.followers;
        stats.stars = repoRes.data.stargazers_count;
        fs.writeFileSync("./stats.json", JSON.stringify(stats, null, 2));
    }

    // update README.md
    const time = Date().toString().toLowerCase().substring(16,21);
    const readMeContent = generateReadme(tamagitchi.pet.emotion, getEmotionUrl(tamagitchi.pet.emotion), time);
    fs.writeFileSync("./profile-repo/README.md", readMeContent);

    console.log(tamagitchi.pet.emotion);
    console.log(recentAct.length);
    console.log(olderAct.length);
};


function generateReadme(emotion, url, time){
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

    return `${otherContent}
<div align="center">
<img style="width: 50em;" src="${url}" alt="tamagitchi" /><br>
${emotionContent}

<p>last updated: ${time} pst</p>
</div>`;
}
main();