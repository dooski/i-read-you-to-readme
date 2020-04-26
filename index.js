const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeToFile = util.promisify(fs.writeFile)

inquirer
    .prompt([
        {
            type: "list",
            name: "hello",
            message: "Hello! Thanks for picking I Read You to README. Let's read some information about your project to make it a neat new README.",
            choices: ["Sounds good!", "I'm excited!", "Whatever."]
        },
        {
            type: "input",
            name: "gitName",
            message: "To start, what is your username on GitHub?"
        },
        {
            type: "input",
            name: "repoName",
            message: "Nice to meet you! I'll add your profile pic to the file. What is the name of the repo you'd like a README for?",
        },
        {
            type: "input",
            name: "installation",
            message: "Great! I should be able to pull the description listed there and add a few badges. Next up, how would a user install your application?",
        }
    ])
    .then(answers => {
        console.log(answers.repoName)
        infoBuilder(answers);
        // const readme = generateReadme(answers);

    })
    .catch(error => {
        console.log(error)
    });

async function infoBuilder(answers) {
    try {
        info = [answers.gitName, answers.repoName, answers.installation]
        let github = await githubAPI(answers)
        await info.push(github.data.owner.login)
        console.log(info)
    }
    finally {
        let readme = await generateReadme(info);
        await writeToFile("README.md", readme);
    }
}
async function generateReadme(info) {
    return `#${info[1]}#
    ${info[3]}`
        ;
}


function githubAPI() {
    const URL = "https://api.github.com/repos/" + info[0] + "/" + info[1];
    return axios.get(URL)
        .then(response => {
            return response
        })

}
