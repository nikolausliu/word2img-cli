const { createCanvas } = require('canvas')
const { defaults, loadOptions } = require('../utils/options')

const getPresets = () => {
  const savedOptions = loadOptions()
  return Object.assign({}, savedOptions.presets, defaults.presets)
}

exports.newCanvas = function (word, options) {
  if (options.preset) {
    const presetName = options.preset;
    const presets = getPresets();
    options = presets[presetName];
  }
  
  const canvas = createCanvas(options.width, options.height)
  const ctx = canvas.getContext('2d')

  // rect
  ctx.fillStyle = options.bgColor
  ctx.fillRect(0, 0, options.width, options.height)
  // word
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.font = `${options.size}px ${options.family}`
  ctx.fillStyle = options.color
  ctx.fillText(word, options.width / 2, options.height / 2)

  return {
    canvas,
    ctx,
  }
}
