const express = require('express')
const bodyParser = require('body-parser');
const githubWebhook = require('./github-webhook');

const app = express()
const port = 3000

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})