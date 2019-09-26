#!/usr/bin/env node

const {log} = require('./util');

require('yargs')
  .scriptName('opinionated-review')
  .commandDir('commands')
  .demandCommand()
  .fail((msg, err) => {
    log(msg || err);
    process.exit();
  })
  .help().argv;
