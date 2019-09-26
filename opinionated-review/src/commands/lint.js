const {pullArticles, lintArticles} = require('../util');

async function lint(argv) {
  await pullArticles();
  await lintArticles();
}

exports.command = 'lint';
exports.desc = 'Lint articles';
exports.builder = {};
exports.handler = lint;
