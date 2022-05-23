const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ws = fs.createWriteStream(path.join(__dirname, '../02-write-file') + '/result.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('SIGINT', function () {
  console.log('exit with Ctrl+C');
  process.exit();
});

const writeToFile = function () {
  rl.question('', (answer) => {
    if (answer === 'exit') {
      console.log('exit with keyword');
      return rl.close();
    }
    ws.write(answer + '\n', 'UTF8');
    writeToFile();
  });
};

console.log('Hello, enter your message:');
writeToFile();

ws.on('error', (error) => {
  console.log(error.stack);
});
