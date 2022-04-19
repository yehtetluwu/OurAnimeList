// comment out aws stuff for now
// var AWS = require("aws-sdk");

// AWS.config.update({
//   region: "us-east-1",
//   endpoint: "http://localhost:8000"
// });

const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 4000;
const {client_id} = require('./config');
const API = require('./myanimelist-api-v2')
const anime = new API.API_ANIME(client_id);
const structures = require("./myanimelist-api-v2/src/Mal_Api_Authorized/Mal_Api_Anime/structures.json");
// import conversion functions
const tools = require('./Tools')
//app.use(express.static('../client/public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const search = require('./Search')
// search by title
app.get('/search', (req, res) => {
    const query = req.query
    res.send(search.Search(query))
})

// function GetAnimeDetails (id, fields=structures.animeFull) {
//     //@params: id, fields
//     const main = anime.anime(id, fields)
//     .then((data) => {
//         return data; 
//     });

//     // const printDetails = async () => {
//     //     main.then((a) => {
//     //         console.log(a);
//     //     });
//     // }
//     // printDetails();
// }

//const getDetails = require('./GetDetails')
// get anime details 
app.get('/anime/:id', (req, res) => {
    const id = req.params.id
    
    const main = anime.anime(id, fields=structures.animeFull)
    .then((data) => {
        res.status(200).send(data)
    });
})

const getSeasonal = require('./GetSeasonal')
// get by season
app.get('/seasonal', (req, res) => {
    res.send(getSeasonal.GetSeasonal())
})

const getRanking = require('./GetRanking');
const GetDetails = require('./GetDetails');
// get anime ranking
app.get('/ranking', (req, res) => {
    let data = getRanking.GetRanking()
    res.send(data)
})

app.listen(PORT, () => {
    console.log(`OurAnimeList is listening at http://localhost:${PORT}`); 
})