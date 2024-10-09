const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

function mergeFolders(baseFolder) {
  const items = fs.readdirSync(baseFolder);

  items.forEach((item) => {
    const itemPath = path.join(baseFolder, item);
    if (fs.statSync(itemPath).isDirectory()) {
      const nestedItems = fs.readdirSync(itemPath);
      nestedItems.forEach((nestedItem) => {
        const nestedItemPath = path.join(itemPath, nestedItem);
        const newItemPath = path.join(baseFolder, nestedItem);
        fs.renameSync(nestedItemPath, newItemPath);
      });
      rimraf.sync(itemPath); // Remove the now-empty nested folder
    }
  });
}

export default mergeFolders;
