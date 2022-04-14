const {client_id} = require('./config');
const API = require('./myanimelist-api-v2')
const anime = new API.API_ANIME(client_id);
const structures = require("./myanimelist-api-v2/src/Mal_Api_Authorized/Mal_Api_Anime/structures.json");
// import conversion functions
const tools = require('./Tools')

function getSeasonForNumberMonth(month) {
    switch (month) {
        case month < 3:
            return "winter";
        case month > 2 && month < 6:
            return "spring";
        case month > 5 && month < 9:
            return "summer";
        default:
            return "fall";
    }
}

module.exports = { 
    //return all anime from specific season
    GetSeasonal: function (year=new Date().getFullYear(), season=getSeasonForNumberMonth(new Date().getMonth()), offset=0, limit=50, sort="anime_score", fields=structures) {
        const main = anime.animeSeasonal(year, season, offset, limit, sort, fields)
        main.then(result => {
            // still can't unpack nested objects (main_picture) and arrays (genres & studios)
            let obj = result.data;
            let res = [];
            for (let i in obj) {
                res.push([i, obj[i]]);
            }
            for(let i=0; i< res.length; i++) {
                console.log(res[i]);
            }
        }).catch(console.log)
    }
}