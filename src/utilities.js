import fs from 'fs';
import path from 'path';
import messages from './messages.js';

export const nodeToJson = (current, $) => {
  const node = {};
  Object.entries(current.attr()).forEach(([key, value]) => {
    if (key === 'class') {
      node[key] = value.split(' ');
    } else {
      node[key] = value;
    }
  });
  node['tag'] = current[0].name;
  node['children'] = [];
  node['textNode'] = current.text();
  for (const child of current.children()) {
    node['children'].push(nodeToJson($(child), $));
  }
  return node;
};

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
  if (!fs.existsSync(directory)) {
    fs.mkdir(directory, (err) => {
      if (err) {
        messages.error([err]);
      }
    });
  }
};
