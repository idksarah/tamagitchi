import { Octokit } from "octokit";
import dotenv from "dotenv";
import fs from "fs";
import { getEmotionUrl, tamagitchi } from "./tamagitchi.mjs";
import { User } from "./user.mjs";
import stats from "./stats.json" with {type: "json"};

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const DAY = 24 * 60 * 60 * 1000; 
const username = "idksarah";
const highlightedRepo = "tamagitchi"; // let user choose!
const regEvents = ["PushEvent", "ReleaseEvent", "WatchEvent", "CommitCommentEvent", "CreateEvent", "DeleteEvent", "GollumEvent", "PublicEvent"];
const socialEvents = ["ForkEvent", "IssueCommentEvent", "IssuesEvent", "PullRequestEvent", "PullRequestReviewEvent", "PullRequestReviewCommentEvent",  "PullRequestReviewThreadEvent", "MemberEvent"];

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

    let recentAct = [], olderAct = []; // activity within last day and 3 days

    publicActivity.data.forEach(event => {
        let date = new Date(event.created_at);
        if(date.getTime() >= Date.now() - DAY / 12){ // within last 2 hours
            recentAct.push(event);
        } else if (date.getTime() >= Date.now() - 3 * DAY){ // within last 3 days
            olderAct.push(event);
        }
    })
    if (recentAct.length != 0){
        if (userRes.data.followers > 1 || repoRes.data.stargazers_count > stats.stargazers_count){
            tamagitchi.pet.emotion = "excited";
        } else if(recentAct.length >= 1){
            if(recentAct.length >= 5){
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
    stats.followers = userRes.data.followers;
    stats.stars = repoRes.data.stargazers_count;
    fs.writeFileSync("./stats.json", JSON.stringify(stats, null, 2));

    // generate update README.md
    const readMeContent = generateReadme(tamagitchi.pet.emotion, getEmotionUrl(tamagitchi.pet.emotion));
    fs.writeFileSync("./profile-repo/README.md", readMeContent);
};

function generateReadme(emotion, url){
    if (emotion == "excited"){
        return `<div align="center">
            <img src="${url}" alt="tamagitchi" /><br>
            tamagitchi is feeling ${emotion}!<br>
            petting them can't make them any happier, but it sure will make ${username} happy! (<a href="https://github.com/${username}/${highlightedRepo}">star ${username}'s ${highlightedRepo}!! ⭐</a>)
            </div>`;
            ;
    } else {
        return `<div align="center">
        <img src="${url}" alt="tamagitchi" /><br>
        tamagitchi is feeling ${emotion}!<br>
        pet them to make them excited! (<a href="https://github.com/${username}/${highlightedRepo}">star ${username}'s ${highlightedRepo}!! ⭐</a>)
        </div>`;

    }
}

main();