const express = require('express');
const { Cat } = require('./models');
const app = express();

app.use(express.json());

app.post('/cats', (req, res) => {
    Cat.create(req.body).then(cat => res.status(201).send(cat))
    .catch((error) => {
        res.status(400).send(error)
        });
});

app.get('/cats', (req, res) => {
    Cat.findAll({where: req.query})
    .then((cat) => res.status(200).send(cat))
    .catch((error) => {
        res.status(400).send(error)
        });
});

app.get('/cats/:catId', (req, res) => {
    Cat.findByPk(req.params.catId)
    .then((cat) => res.status(200).json(cat)) 
    .catch((error) => {
        res.status(400).send(error)
        });
});

app.patch('/cats/:catId', (req, res) => {
    Cat.update(
        { lastFed: new Date() },
        { where: {id: req.params.catId}}
    ).then((cat) => res.status(201).send(cat))
    .catch((error) => {
        res.status(400).send(error)
        });
});

app.delete('/cats/:catId', (req, res) => {
    Cat.destroy (
        { where: {id: req.params.catId}}
    ).then((cat) => res.status(200).send(cat))
    .catch((error) => {
        res.status(400).send(error)
        });
})

module.exports = app