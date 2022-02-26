import path from 'path';
import fs from 'fs';
import messages from '../stdout/messages.js';

export const createFile = (data, fileName = 'html-tree.json', directory = 'data') => {
  if (directory) createDirectory(path.join(process.cwd(), directory));
  const outputFile = path.join(process.cwd(), `/${directory}`, fileName);
  fs.writeFile(outputFile, data, 'utf8', (err) => {
    if (err) {
      messages.error([err, `Could not save file, ${fileName}`]);
      process.exit(1);
    } else {
      messages.success(['Successfully extracted data and saved to']);
      messages.info([fileName]);
    }
  });
};

const createDirectory = (directory) => {
  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
  } catch (error) {
    messages.error([error]);
  }
};
