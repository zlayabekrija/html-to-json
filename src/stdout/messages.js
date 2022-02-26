import chalk from 'chalk';

class Messages {
  constructor(chalk) {
    this.chalk = chalk;
  }

  error(messages) {
    for (const message of messages) {
      console.error(chalk.red(message));
    }
  }
  success(messages) {
    for (const message of messages) {
      console.log(chalk.green(message));
    }
  }
  info(messages) {
    for (const message of messages) {
      console.log(chalk.yellow(message));
    }
  }
}

export default new Messages(chalk);
