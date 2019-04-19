const fse = require('fs-extra')
const fs = require('fs')
const yaml = require('js-yaml')
const { join } = require('path')
const recursiveCopy = require('recursive-copy')
const execa = require('execa')

const INPUT_DIR = '/in'
const OUTPUT_DIR = '/out'
const ROOT_DIR = '/app'
const ARTICLES_DIR = join(ROOT_DIR, 'articles')
const THEME_DIR = join(ROOT_DIR, 'themes')

const OPINIONATED_CONFIG_PATH = join(ARTICLES_DIR, 'opinionated-review.yml')
const CONFIG_MOD_PATH = join(ARTICLES_DIR, 'opinionated-review-mod.yml')
const CONFIG_PATH = join(ARTICLES_DIR, 'config.yml')

class CommandError extends Error {}

function loadConfig() {
  return loadYAML(CONFIG_PATH)
}

function log(...obj) {
  console.log('===>', ...obj)
}

function loadYAML(yamlPath) {
  return yaml.safeLoad(fs.readFileSync(yamlPath), 'utf-8')
}

function saveYAML(savePath, obj) {
  return fs.writeFileSync(savePath, yaml.safeDump(obj))
}

async function copyTheme(themeName) {
  log(`Using theme '${themeName}'`)
  await fse.copy(join(THEME_DIR, themeName), ARTICLES_DIR)
}

async function pullArticles() {
  log('Copying sources to the container')
  await recursiveCopy(INPUT_DIR, ARTICLES_DIR, {
    filter: ['**/*', '!*.pdf', '!*.epub'],
    overwrite: true,
  })
}

async function pushArticles(filter) {
  log('Pushing back artifacts to the local dir')
  await recursiveCopy(ARTICLES_DIR, OUTPUT_DIR, {
    filter,
    overwrite: true,
  })
}

async function preprocessConfigFiles(mode = 'pdf', cliPaperSize) {
  let opinionatedReviewConfig
  try {
    opinionatedReviewConfig = loadYAML(OPINIONATED_CONFIG_PATH)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
    opinionatedReviewConfig = {}
  }

  const paperSize = cliPaperSize || opinionatedReviewConfig.paper || 'A5'
  const modConfig = loadYAML(CONFIG_MOD_PATH)
  const extraConfig = modConfig[mode][paperSize] || {}
  let config = loadYAML(CONFIG_PATH)
  config = { ...config, ...extraConfig }
  log('paper size:', paperSize)
  log('extra config:\n', JSON.stringify(extraConfig, null, 2))
  saveYAML(CONFIG_PATH, config)
}

async function buildReview(mode = 'pdf') {
  log('Compiling Re:VIEW sources')
  const execaArgs = {
    env: {
      REVIEW_CONFIG_FILE: 'config.yml',
    },
    cwd: ARTICLES_DIR,
  }
  try {
    const preprocOut = await execa('rake', ['preproc'], execaArgs)
    const reviewOut = await execa('rake', [mode], execaArgs)
    log('Done')

    return { reviewOut, preprocOut }
  } catch (err) {
    throw new CommandError(err.stderr)
  }
}

async function buildMobi() {
  log('Building .mobi using kindlegen')

  const config = loadYAML(CONFIG_PATH)
  const epubPath = join(ARTICLES_DIR, config.bookname + '.epub')
  const mobiPath = join(ARTICLES_DIR, config.bookname + '.mobi')

  try {
    const kindlegenOut = await execa('kindlegen', [epubPath], {
      cwd: ARTICLES_DIR,
    })
    log('Done')

    return kindlegenOut.stdout
  } catch (err) {
    if (!fs.existsSync(mobiPath)) {
      throw new CommandError(err.stdout)
    }
    return err.stdout
  }
}

async function lintArticles(argv) {
  log('Linting Re:VIEW articles')
  await fse.copy(
    join(ROOT_DIR, 'assets', 'prh.yml'),
    join(ARTICLES_DIR, 'prh.yml')
  )
  const { stdout } = await execa('yarn', ['lint'], { cwd: ROOT_DIR })
  console.log(stdout)
}

module.exports = {
  log,
  loadConfig,
  loadYAML,
  saveYAML,
  copyTheme,
  pullArticles,
  pushArticles,
  preprocessConfigFiles,
  buildReview,
  buildMobi,
  lintArticles,
}
