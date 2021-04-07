const path = require('path')
const os = require('os')

exports.getRcPath = (file) => {
  return path.join(os.homedir(), file)
}
