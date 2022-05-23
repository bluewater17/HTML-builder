const path = require('path');
const fs = require('fs/promises');

const sourcePath = path.join(__dirname, '/files');
const copyPath = path.join(__dirname, '/files-copy');

(async function copyFolder(source, copy) {
  await fs.rm(copy, { force: true, recursive: true });
  await fs.mkdir(copy);
  const sourceElements = await fs.readdir(source, { withFileTypes: true });

  for (const element of sourceElements) {
    if (element.isFile()) {
      const sourceFilePath = path.join(source, element.name);
      const copyFilePath = path.join(copy, element.name);
      await fs.copyFile(sourceFilePath, copyFilePath);
    } else if (element.isDirectory()) {
      await fs.mkdir(path.join(copy, element.name));
    }
  }
})(sourcePath, copyPath);
