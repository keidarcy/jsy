#! /usr/bin/env node

'use strict';

// https://t.co/FVBlPbfft7

import path from 'path';
import fs from 'fs';
import minimist from 'minimist';
import getStdin from 'get-stdin';

const args = minimist(process.argv.slice(2), {
  boolean: ['help', 'in'],
  string: ['file']
});

const dirname = path.dirname(new URL(import.meta.url).pathname);

const BASE_PATH = path.resolve(process.env.BASE_PATH || dirname);
// Posix
// process.stdout.write('hello world\n');
// console.error('Oops');
// console.log('hello world');

// node 1.js 1> /dev/null
// node 1.js 2> /dev/null
// node 1.js 2> /dev/null 1>&2

// process.stdin.read()

const printHelp = () => {
  console.log('1.js usage:');
  console.log('  1.js --help');
  console.log('  1.js --file={FILENAME} ');
  console.log('');
  console.log('--help                             print this help');
  console.log('--file={FILENAME}                  process the file');
  console.log('--in, -                  process stdin');
  console.log('');
};

const error = (msg, includeHelp = false) => {
  console.error(msg);
  if (includeHelp) {
    console.log('');
    printHelp();
  }
};

const processFile = (contents) => {
  // const contents = fs.readFileSync(filepath, 'utf-8');
  // console.log(contents);
  // const contents = fs.readFileSync(filepath);
  // process.stdout.write(contents);
  contents = contents.toString().toUpperCase();
  console.log(contents);
};

// printHelp();

if (args.help) {
  printHelp();
} else if (args.in || args._.includes('-')) {
  getStdin().then(processFile).catch(error);
} else if (args.file) {
  fs.readFile(path.join(BASE_PATH, args.file), (err, contents) => {
    if (err) {
      error(err.toString());
    } else {
      processFile(contents);
    }
  });
} else {
  error('Incorrect usage.', true);
}
