#!/usr/bin/env node

require('yargs')
  .scriptName('opinionated-review')
  .commandDir('commands')
  .demandCommand()
  .help().argv
