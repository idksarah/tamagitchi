import { Octokit } from "octokit";
import dotenv from "dotenv";
import fs from "fs";
import { tamagitchi } from "./tamagitchi.mjs";
import { User } from "./user.mjs";
import stats from "./stats.json" with {type: "json"};

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const regEvents = ["PushEvent", "ReleaseEvent", "WatchEvent", "CommitCommentEvent", "CreateEvent", "DeleteEvent", "GollumEvent", "PublicEvent"];
const socialEvents = ["ForkEvent", "IssueCommentEvent", "IssuesEvent", "PullRequestEvent", "PullRequestReviewEvent", "PullRequestReviewCommentEvent",  "PullRequestReviewThreadEvent", "MemberEvent"];

const DAY = 24 * 60 * 60 * 1000; 

const highlightedRepo = "tamagitchi"; // let user choose!

const main = async () => {
    const userRes = await octokit.request("GET /user");
    console.log("Authenticated as:", userRes.data.login);

    const publicActivity = await octokit.rest.activity.listPublicEventsForUser({
        username: `${userRes.data.login}`,
        per_page: 10
    });

    const repoRes = await octokit.rest.repos.get({
         owner: `${userRes.data.login}`,
         repo: highlightedRepo
     });

    let lastDayAct = [], lastThreeDayAct = []; // activity within last day and 3 days
    publicActivity.data.forEach(event => {
        let date = new Date(event.created_at.substring(0,10));
        if(date.getTime() > Date.now() - DAY){ // within last day
            lastDayAct.push(event);
        } else if (date.getTime() > Date.now() - 3 * DAY){ // within last 3 days
            lastThreeDayAct.push(event);
        }
    })
    lastThreeDayAct.forEach(event => {
        if(lastThreeDayAct.length == 0){
            tamagitchi.pet.emotion = "sad";
        } else {
            tamagitchi.pet.emotion = "happy";
        }
    })
    lastDayAct.forEach(event => {
        if (userRes.data.followers > 1 || repoRes.data.stargazers_count > stats.stargazers_count){
            tamagitchi.pet.emotion = "excited";
        } else if(lastDayAct.length >= 1){
            if(lastDayAct.length >= 5){
                tamagitchi.pet.emotion = "excited";
            } else {
                tamagitchi.pet.emotion = "happy";
            }
        } 
    })
    // console.log(stats);
    // console.log(userRes.data.followers);
    // console.log(repoRes.data.stargazers_count);
    // console.log(tamagitchi.pet.emotion);

    // update stats.json
    stats.followers = userRes.data.followers;
    stats.stars = repoRes.data.stargazers_count;
    fs.writeFileSync("./stats.json", JSON.stringify(stats, null, 2));
};

main();