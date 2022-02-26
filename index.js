import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import cheerio from 'cheerio';
import request from 'request';
import {validateCli} from './src/stdin/cli_validations.js';
import messages from './src/stdout/messages.js';
import {nodeToJson} from './src/utilities/utilities.js';
import cliArguments from './src/stdin/cli_arguments.js';
import {createFile} from './src/stdio/fs_utilities.js';
// cli arguments
const {url, file, directory, startingNode} = yargs(hideBin(process.argv)).argv;

// validate necessary arguments
validateCli(url);

// get filename
const fileName = cliArguments.fileName(file);
// get directory name
const currentDirectory = cliArguments.dirName(directory);
// default starting node
const startNode = cliArguments.startingNode(startingNode);

request(url, function (_, response, body) {
  messages.success(['Request responded with status', response && response.statusCode, 'extracting data started...']);
  const $ = cheerio.load(body);
  const child = $(startNode)[0];

  const result = nodeToJson($(child), $);

  const json = JSON.stringify(result, null, 4);
  createFile(json, fileName, currentDirectory);
});
