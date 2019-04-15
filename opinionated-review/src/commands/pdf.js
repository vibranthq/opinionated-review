const {
  copyTheme,
  pullArticles,
  preprocessConfigFiles,
  buildReview,
  pushArticles,
} = require('../util')

async function generatePDF(argv) {
  await copyTheme('techbooster')
  await pullArticles()
  await preprocessConfigFiles('pdf', argv.paperSize)
  await buildReview('pdf')
  await pushArticles()
}

exports.command = 'pdf'
exports.desc = 'Create an PDF'
exports.builder = {
  paperSize: {},
  theme: {
    default: 'techbooster',
  },
}
exports.handler = generatePDF
