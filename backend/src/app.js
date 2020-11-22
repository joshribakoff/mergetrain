const express = require('express')
const bodyParser = require('body-parser');
const githubWebhook = require('./github-webhook');

const app = express()

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/slack-webhook', (req, res) => {
  console.log('test',req.body)
  res.send({
    response_type: 'in_channel',
    text: 'Please wait...'
  })
})

app.post('/github-webhook', (req, res) => {
  githubWebhook(req, res)
})

var os = require("os");
var hostname = os.hostname();

// health check / liveliness probes
app.get('/', (req, res) => {
  console.log('sending hello ' + hostname + ' ' + new Date())
  res.send({message:'hello world'})
})

module.exports = app