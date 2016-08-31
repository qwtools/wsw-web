/* eslint no-console: 0 */
/* eslint no-process-env: 0 */

const net = require('net')
const port = process.env.WSW_SCRIPTS_PORT || 1337
const host = process.env.WSW_SCRIPTS_HOST || '0.0.0.0'

const client = {
  command(name, stdout, finished) {
    let socket = new net.Socket()

    if (stdout) {
      socket.on('data', stdout)
    }

    if (finished) {
      socket.on('close', finished)
    }

    socket.connect(port, host, () => socket.write(name))

    return socket
  }
}

module.exports = client