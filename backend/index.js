const app = require('./app')
const port = 3000

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})