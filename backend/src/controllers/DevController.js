const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async store (request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const apiRespose = await axios.get(`https://api.github.com/users/${github_username}`);

            // utiliza o login caso o nome não exista
            const { name = login, avatar_url, bio } = apiRespose.data;

            // corta a string em cada virgula e remove os espaços de cada um.
            const techsArray = techs.split(',').map(tech => tech.trim());

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }

        return response.json(dev);
    }
}