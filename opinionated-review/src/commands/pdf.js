const {
  copyTheme,
  pullArticles,
  preprocessConfigFiles,
  buildReview,
  pushArticles,
} = require("../util");

async function generatePDF(argv) {
  await copyTheme(argv.theme);
  await pullArticles();
  await preprocessConfigFiles("pdf", argv.paperSize);
  await buildReview("pdf");
  await pushArticles(["*.pdf"]);
}

exports.command = "pdf";
exports.desc = "Create an PDF";
exports.builder = {
  paperSize: {},
  theme: {
    default: "techbooster",
  },
};
exports.handler = generatePDF;
