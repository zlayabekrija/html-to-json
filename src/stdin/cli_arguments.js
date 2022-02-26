import messages from '../stdout/messages.js';

class CliArguments {
  constructor(messages) {
    this.messages = messages;
  }
  fileName(file) {
    let fileName = 'html-tree.json';
    if (file) {
      fileName = `${file}.json`;
    } else {
      this.messages.info(["Flag --file hasn't been set", `Using default file name ${fileName}`]);
    }
    return fileName;
  }
  dirName(directory) {
    let currentDirectory = 'data';
    if (directory) {
      currentDirectory = directory;
    } else {
      this.messages.info(["Flag --directory hasn't been set", `Using default directory name ${currentDirectory}`]);
    }
    return currentDirectory;
  }
  startingNode(startingNode) {
    let startNode = 'body';
    if (startingNode) {
      startNode = startingNode;
    } else {
      this.messages.info(["Flag --startingNode hasn't been set", `Using default node ${startNode}`]);
    }
    return startNode;
  }
}
export default new CliArguments(messages);
