import express from 'express'
const { api } = require('../controllers');

const app = express()

app.post('/add_pegawai', api.users.addPegawai)

app.post('/add_incTicket', (req, res) => {
    res.sendStatus(200)
})

app.post('/add_reqTicket', (req, res) => {
    res.sendStatus(200)
})

app.post('/add_message', (req, res) => {
    res.sendStatus(200)
})

app.post('/add_notification', (req, res) => {
    res.sendStatus(200)
})

export default app;
