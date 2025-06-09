import { Octokit } from "octokit";
import dotenv from "dotenv";
import fs from "fs";
// import { Emotions } from "./emotions.mjs";
import { tamagitchi } from "./tamagitchi";
import { User } from "./user.mjs";

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const regEvents = ["PushEvent", "ReleaseEvent", "WatchEvent", "CommitCommentEvent", "CreateEvent", "DeleteEvent", "GollumEvent", "PublicEvent"];
const socialEvents = ["ForkEvent", "IssueCommentEvent", "IssuesEvent", "PullRequestEvent", "PullRequestReviewEvent", "PullRequestReviewCommentEvent",  "PullRequestReviewThreadEvent", "MemberEvent"];

const DAY = 24 * 60 * 60 * 1000; 
let designatedRepo = "tamagitchi"; // let user set this up somehow? maybe in the .env idk

const main = async () => {
    const userRes = await octokit.request("GET /user");
    console.log("Authenticated as:", userRes.data.login);

    const publicActivity = await octokit.rest.activity.listPublicEventsForUser({
        username: `${userRes.data.name}`,
        per_page: 10
    })

    // console.log(publicActivity.data)
    let lastDayAct = [], lastThreeDayAct = []; // activity within last day and 3 days
    publicActivity.data.forEach(event => {
        let date = new Date(event.created_at.substring(0,10));
        if(date.getTime() > Date.now() - DAY){ // within last day
            lastDayAct.push(event);
        } else if (date.getTime() > Date.now() - 3 * DAY){ // within last 3 days
            lastThreeDayAct.push(event);
        }
    })
    lastDayAct.forEach(event => {
        if(lastDayAct.length >= 1){
            if(lastDayAct.length >= 5){
                tamagitchi.pet.emotion = "excited";
            } else {
                tamagitchi.pet.emotion = "happy";
            }
        } 
    })
    lastThreeDayAct.forEach(event => {
        if(lastThreeDayAct.length == 0){
            tamagitchi.pet.emotion = "sad";
        } else {
            tamagitchi.pet.emotion = "happy";
        }
    })
    // for(let i = 0; i < publicActivity.data.length; i++){
    //     let event = publicActivity.data[i].type
    //     if (regEvents.some(element => element === event)) {
    //         User.currUser.regEvents++;
    //     } else if (socialEvents.some(element => element === event)) {
    //         User.currUser.socialEvents++;
    //     }
    // }
    User.currUser.followers = userRes.data.followers;
    console.log(User.currUser);


    
    const lastStatusRes = await fetch("https://raw.githubusercontent.com/idksarah/tamagitchi/main/status.json");
    const lastStatus = await lastStatusRes.json();

    console.log(lastStatus);
    //write to file here



};

main();