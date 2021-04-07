const fs = require('fs')
const cloneDeep = require('lodash.clonedeep')
const { getRcPath } = require('../utils/rcPath')
const rcPath = exports.rcPath = getRcPath('.word2imgrc')

exports.defaults = {
  presets: {
    default: {
      width: '600',
      height: '200',
      bgColor: '#ffffff',
      color: '#ffffff',
      fontSize: 48,
      fontFamily: 'Arial'
    }
  },
  fonts: {
    
  }
}

let cachedOptions

exports.loadOptions = () => {
  if (cachedOptions) {
    return cachedOptions
  }
  if (fs.existsSync(rcPath)) {
    try {
      cachedOptions = JSON.parse(fs.readFileSync(rcPath, 'utf-8'))
      // cachedOptions = Object.assign({}, exports.default, cachedOptions)
    } catch (e) {
      console.error(
        `Error loading saved preferences: ` +
        `~/.txt2imgrc may be corrupted or have syntax errors. ` +
        `Please fix/delete it and re-run 'txt2img preset'.\n` +
        `(${e.message})`
      )
    }
    return cachedOptions
  } else {
    return {}
    // return exports.default
  }
}

exports.saveOptions = toSave => {
  const options = Object.assign(cloneDeep(exports.loadOptions()), toSave)
  for (const key in options) {
    if (!(key in exports.defaults)) {
      delete options[key]
    }
  }
  cachedOptions = options
  try {
    fs.writeFileSync(rcPath, JSON.stringify(options, null, 2))
    return true
  } catch (e) {
    console.error(
      `Error saving preferences: ` +
      `make sure you have write access to ${rcPath}.\n` +
      `(${e.message})`
    )
  }
}

exports.savePreset = (name, preset) => {
  const presets = cloneDeep(exports.loadOptions().presets || {})
  presets[name] = preset
  return exports.saveOptions({ presets })
}
