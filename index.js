const express = require('express')
const bodyParser = require('body-parser')

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
  let payload
  if(Object.keys(req.body).length === 1 && undefined !== req.body.payload) {
    payload = JSON.parse(req.body.payload)
  } else {
    payload = req.body
  }
  console.log('test',JSON.stringify(payload,null,2))
  res.send('hi world')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})