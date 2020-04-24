const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

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
            name: "appName",
            message: "So, what do you call your project?"
        }
    ])
    .then(answers => {
        console.log(answers.appName)
        const readme = generateReadme(answers);
        return writeToFile("readme.md", readme);
    })
    .catch(error => {
        console.log("oh no")
    });

function generateReadme(answers) {
    return `
     ${answers.appName}`;
};
