const http = require('http')
const logger = require('./utils/logger')
const app = require('./app')

const server = http.createServer(app)

const PORT = 3003
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
