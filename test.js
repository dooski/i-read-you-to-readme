const axios = require('axios')

const URL = "https://api.github.com/repos/dooski/dooskbot";
axios.get(URL).then(response => {
    console.log(response.data.owner.login)
})