
const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router();

routes.get('/devs', DevController.getDevs);
routes.post('/devs', DevController.createDev);

routes.get('/search', SearchController.index);

module.exports = routes;
