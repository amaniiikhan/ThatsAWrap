const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios');
//import { addUser } from './database';   
require('dotenv').config()
const path = require('path');

app.use(cors())


app.get("/top20",async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://spotify81.p.rapidapi.com/top_20_by_monthly_listeners',
        headers: {
          'X-RapidAPI-Key': process.env.SPOTIFY_KEY,
          'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }

});

app.get("/top10artistmusic",async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://theaudiodb.p.rapidapi.com/track-top10.php',
        params: {s: 'taylor swift'},
        headers: {
          'X-RapidAPI-Key': process.env.AUDIODB_KEY,
          'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
})


app.listen(3001, () => {
    console.log("Server running on port 3001");
})