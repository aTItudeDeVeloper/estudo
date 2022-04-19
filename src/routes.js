const express = require('express');
const ImageController = require('./controllers/ImageController');
const multer = require('multer');
const multerConfig  = require('./config/multer');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({hello: "Word"});
});

routes.post('/post', multer(multerConfig).single('file'), ImageController.createImage);
routes.put('/post', multer(multerConfig).single('file'), ImageController.updateImage);
routes.delete('/post', multer(multerConfig).single('file'), ImageController.deleteImage);

module.exports = routes;