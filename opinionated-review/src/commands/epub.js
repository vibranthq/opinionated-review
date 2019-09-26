const {
  copyTheme,
  pullArticles,
  preprocessConfigFiles,
  buildReview,
  pushArticles,
} = require('../util');

async function generateEPUB(argv) {
  await copyTheme(argv.theme);
  await pullArticles();
  await preprocessConfigFiles('epub', argv.paperSize);
  await buildReview('epub');
  await pushArticles(['*.epub']);
}

exports.command = 'epub';
exports.desc = 'Create an EPUB';
exports.builder = {
  paperSize: {},
  theme: {
    default: 'techbooster',
  },
};
exports.handler = generateEPUB;
