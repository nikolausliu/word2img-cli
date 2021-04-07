const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

exports.canvas2img = function (canvas, filename, filepath) {
  const buf = canvas.toBuffer()
  filename = filename || `word2img_${Date.now()}.png`
  const url = path.resolve(filepath, filename)
  fs.writeFile(url, buf, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(
        `✨ image generated successfully at: ${chalk.yellow(
          url
        )}`
      )
    }
  })
}
