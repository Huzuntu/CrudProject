const express = require('express');
const route = express.Router();

const services = require('../services/render')
const controller = require('../controller/controller')


route.get('/', services.homeRoutes);
route.get('/user-table', services.user_table);
route.get('/add-user', services.add_user);
route.get('/update-user', services.update_user);

route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.get('/api/paginated-users', controller.getUsers);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route;