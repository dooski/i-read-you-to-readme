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
            message: "Great! I should be able to pull the description listed there. Next up, how would a user install your application?",
        },
        {
            type: "input",
            name: "usage",
            message: "Ok! And how would a user use this application?"
        },
        {
            type: "input",
            name: "contributors",
            message: "Please list any other contributors besides you. If there are none, please write 'none'."
        },
        {
            type: "input",
            name: "license",
            message: "What license is your applciation using?"
        },
        {
            type: "input",
            name: "future",
            message: "Alright, almost done. What are your future plans for development?"
        },
        {
            type: "list",
            name: "cool",
            message: "Finally, how cool is your application?",
            choices: ["Pretty cool!", "Cool!", "Very cool!"]
        }
    ])
    .then(answers => {
        infoBuilder(answers);
    })
    .catch(error => {
        console.log(error)
    });

async function infoBuilder(answers) {
    try {
        info = [answers.gitName, answers.repoName, answers.installation, answers.usage, answers.contributors, answers.license, answers.cool, answers.future]
        if (info[4] = "none") {
            info[4] = "There are no additional contributors"
        }
        if (info[6] = "Pretty cool!") {
            info[6] = "https://img.shields.io/badge/coolness-pretty_cool-orange"
        } else if (info[6] = "Cool!") {
            info[6] = "https://img.shields.io/badge/coolness-cool-blue"
        } else if (info[6] = "Very cool!") {
            info[6] = "https://img.shields.io/badge/coolness-very_cool-brightgreen"
        }
        let github = await githubAPI(answers)
        await info.push(github.data.owner.login, github.data.description, github.data.owner.avatar_url, github.data.owner.private)
        if (info[11] = "true") {
            info[11] = "https://img.shields.io/badge/private-yes-red"
        } else if (info[11] = "false") {
            info[11] = "https://img.shields.io/badge/private-no-brightgreen"
        }
    }
    finally {
        let readme = await generateReadme(info);
        console.log("Ok, " + info[8] + " take a look at the newREADME.md file I made for you and make any edits you feel like! (I won't take it personally.)")
        await writeToFile("newREADME.md", readme);
    }
}

async function generateReadme(info) {
    return `# ${info[1]}
![cool badge](${info[6]}) ![private badge](${info[11]})
--------------------------------------------------
### Table of Contents
* Description
* Installation
* Usage
* License
* Contributors
* Questions
--------------------------------------------------
### Description
${info[9]}

### Installation
${info[2]}

### Usage
${info[3]}

### License
${info[5]}

### Contributors
![avatar](${info[10]})
This application was made by GitHub user ${info[8]}. 

${info[4]}

### Future devlopment
${info[7]}

### Questions
Please contact GitHub user ${info[8]} with questions.`
        ;
}

function githubAPI() {
    const URL = "https://api.github.com/repos/" + info[0] + "/" + info[1];
    return axios.get(URL)
        .then(response => {
            return response
        })

}
