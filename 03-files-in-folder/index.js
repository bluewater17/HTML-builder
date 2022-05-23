const fs = require('fs/promises');
const path = require('path');
const secretFolderPath = path.join(__dirname, '/secret-folder');

(async function getSize() {
  const folderElements = await fs.readdir(secretFolderPath, { withFileTypes: true });
  for (const element of folderElements) {
    if (element.isFile()) {
      const elementPath = path.join(secretFolderPath, element.name);
      const elementSize = (await fs.stat(elementPath)).size / 1024;
      console.log(
        `${path.parse(elementPath).name} - ${path
          .extname(elementPath)
          .slice(1)} - ${elementSize} kb`
      );
    }
  }
})();
