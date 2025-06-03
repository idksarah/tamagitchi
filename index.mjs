import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const main = async () => {
    const userRes = await octokit.request("GET /user");
    console.log("Authenticated as:", userRes.data.login);

    const repoRes = await octokit.rest.repos.get({
        owner: `${userRes.data.name}`,
        repo: "tamagitchi"
    });

    console.log(repoRes.data.name)
};

main();