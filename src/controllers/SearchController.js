const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        //Buscar todos devs num raio de 10KM
        //filtrar por tecnologias
        const { latitude, longitude, techs } = require.query;
        
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near:{
                    $geometry: {
                        type: 'Point',
                        coordinates:[longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        })
        
        return response.json({devs: []})
    }
}