const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage }  = require('../websocket')

module.exports = {
    async getDevs(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async createDev(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name  = login , avatar_url, bio } = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            // Filtar as conexoes que estão a 10km
            const sendSocketMessaegeTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessaegeTo, 'newDev', dev);
            
        }

        return res.json(dev);
    }
}