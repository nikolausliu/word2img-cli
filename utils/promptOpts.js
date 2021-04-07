const chalk = require('chalk')
const { defaultFonts } = require('../utils/fonts')
const { defaults, loadOptions } = require('../utils/options')

const getPresets = () => {
  const savedOptions = loadOptions()
  return Object.assign({}, savedOptions.presets, defaults.presets)
}

const presets = getPresets()

const presetChoices = Object.entries(presets).map(([name, preset]) => {
  let displayName = name
  if (name === 'default') {
    displayName = 'Default'
  }

  return {
    name: displayName,
    value: name,
  };
});

exports.presetPromptOpts = [
  {
    type: 'input',
    name: 'width',
    message: `Input image width${chalk.yellow(
      '(only numbers required,no units \'px\')'
    )}`,
    default: 600,
  },
  {
    type: 'input',
    name: 'height',
    message: `Input image height${chalk.yellow(
      '(only numbers required,no units \'px\')'
    )}`,
    default: 200,
  },
  {
    type: 'input',
    name: 'size',
    message: `Input word font size${chalk.yellow(
      '(only numbers required,no units \'px\')'
    )}`,
    default: 48,
  },
  {
    type: 'list',
    name: 'family',
    message: 'Select word font family',
    choices: defaultFonts,
  },
  {
    type: 'input',
    name: 'color',
    message: `Input valid word color${chalk.yellow(
      '(for example, `#000000` or `black`)'
    )}`,
    default: '#000000',
  },
  {
    type: 'input',
    name: 'bgColor',
    message: `Input valid image background color${chalk.yellow(
      '(for example, `#ffffff` or `white`)'
    )}`,
    default: '#ffffff',
  },
  {
    type: 'list',
    name: 'saveName',
    message: 'Save preset as',
    choices: [
      ...presetChoices,
      {
        name: 'Save as a new preset',
        value: '__new__',
      },
    ],
  },
]

exports.presetNewPromptOpts = [
  {
    type: 'input',
    name: 'saveName',
    message: 'Save preset as',
  },
]

