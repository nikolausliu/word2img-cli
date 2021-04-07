#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { newCanvas } = require('../utils/newCanvas')
const { canvas2img } = require('../utils/canvas2img')
const { savePreset, rcPath } = require('../utils/options')
const { presetPromptOpts, presetNewPromptOpts } = require('../utils/promptOpts')

const prompt = inquirer.createPromptModule()

program.version(require('../package').version).usage('<command> [options]')

program
  .command('preset')
  .description('save options as presets for quick and easy use later')
  .action(async () => {
    const answers = await prompt(presetPromptOpts)
    if (answers.saveName === '__new__') {
      let newAnswers = await prompt(presetNewPromptOpts)
      answers.saveName = newAnswers.saveName
    }
    if (answers.saveName && savePreset(answers.saveName, answers)) {
      console.log()
      console.log(
        `✨  Preset ${chalk.yellow(answers.saveName)} saved in ${chalk.yellow(
          rcPath
        )}`
      )
    }
  })

program
  .command('new <word>')
  .description('generate a new image use the input word')
  .option('-p --preset <preset>', 'generate image use a preset')
  .option('-w --width <width>', 'Set width of the image', 600)
  .option('--height <height>', 'Set geight of the image', 200)
  .option('--bgColor <bgColor>', 'Set backgound-color of the image', '#fff')
  .option('--color <color>', 'Set color of the word', '#000')
  .option('--size <size>', 'Set font-size of the word', 48)
  .option('--family <family>', 'Set font-family of the word', 'Arial')
  .option('--filename <filename>', 'Set filename of the image')
  .option('--filepath <filepath>', 'Set file path to save the image(note that the path doesn\'t contain the file name)', process.cwd())
  .action((word, options) => {
    const { canvas } = newCanvas(word, options)
    canvas2img(canvas, options.filename, options.filepath)
  })

program.on('command:*', ([cmd]) => {
  program.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
  // suggestCommands(cmd)
  process.exitCode = 1
})

program.on('--help', () => {
  console.log()
  console.log(
    `  Run ${chalk.cyan(
      `word2img <command> --help`
    )} for detailed usage of given command.`
  )
  console.log()
})

program.parse(process.argv)
