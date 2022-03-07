# word2img-cli
command line interface for generate image based on your input.

# installation

You need node.js and npm. You should probably install this globally.

```sh
npm install -g word2img-cli
```

# Usage

## `word2img new`

```sh
# Will generate a picture in the directory where the command is currently running
word2img new 'hello world'
```

and you could pass some command parameters:

```sh
word2img new -width 600 -height 300 -color '#f00' 'hello world'
```

available command parameters:

- `-p | --preset`: generate image use a preset
- `-w | --width`: set width of the image
- `--height`: set geight of the image
- `--bgColor`: set backgound-color of the image
- `--color`: set color of the word
- `--size`: set font-size of the word
- `--family`: set font-family of the word
- `--filename`: set filename of the image
- `--filepath`: set file path to save the image(note that the path doesn\'t contain the file name)

## `word2img preset`

would ask you a few questions,and save the answers into a config file `.word2imgrc` in your home dir.then you can use `word2img new -p <presetName> 'hello world'`.
