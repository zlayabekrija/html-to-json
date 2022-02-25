import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import cheerio from 'cheerio';
import request from 'request';
import {validateCli} from './src/validations.js';
import messages from './src/messages.js';
import {createFile, nodeToJson} from './src/utilities.js';

const {url, file, dir} = yargs(hideBin(process.argv)).argv;

//validate necessary arguments
validateCli(url);

//default filename
let fileName = 'html-tree.json';
if (file) fileName = `${file}.json`;

let directory = 'data';
if (dir) directory = dir;

let result = {};
request(url, function (_, response, body) {
  messages.success(['Request responded with status', response && response.statusCode, 'extracting data started...']);
  const $ = cheerio.load(body);
  const child = $('html')[0];

  result = nodeToJson($(child), $);

  const json = JSON.stringify(result, null, 4);
  createFile(json, fileName, directory);
});
