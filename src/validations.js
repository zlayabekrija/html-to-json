import messages from './messages.js';
export function validateCli(url) {
  if (!url) {
    messages.error(['Url flag is missing', 'Process exits with an error']);
    process.exit(1);
  }
  if (typeof url !== 'string' || !url.length) {
    messages.error(['Url is missing, please provide url as string', 'Process exits with an error']);
    process.exit(1);
  }
}
