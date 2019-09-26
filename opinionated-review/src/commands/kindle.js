const {
  copyTheme,
  pullArticles,
  preprocessConfigFiles,
  buildReview,
  buildMobi,
  pushArticles,
  log,
} = require('../util');

async function generateKindle(argv) {
  await copyTheme(argv.theme);
  await pullArticles();

  // epub
  await preprocessConfigFiles('epub', argv.paperSize);
  await buildReview('epub');

  // epub to mobi
  const out = await buildMobi();
  log('Log', out);
  await pushArticles(['*.mobi']);
}

exports.command = 'kindle';
exports.desc = 'Create an Kindle book';
exports.builder = {
  paperSize: {},
  theme: {
    default: 'techbooster',
  },
};
exports.handler = generateKindle;
