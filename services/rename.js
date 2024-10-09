const fs = require("fs");
const path = require("path");

function renameFiles(baseFolder, folderName) {
  const files = fs.readdirSync(baseFolder);
  let imgCounter = 1;
  let vidCounter = 1;

  files.forEach((file) => {
    const filePath = path.join(baseFolder, file);
    const ext = path.extname(file).toLowerCase();
    let newFileName;

    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      newFileName = `IMG_${folderName}_${imgCounter
        .toString()
        .padStart(4, "0")}${ext}`;
      imgCounter++;
    } else if ([".mp4", ".avi", ".mov", ".mkv"].includes(ext)) {
      newFileName = `VID_${folderName}_${vidCounter
        .toString()
        .padStart(3, "0")}${ext}`;
      vidCounter++;
    } else {
      return; // Skip non-image/video files
    }

    const newFilePath = path.join(baseFolder, newFileName);
    fs.renameSync(filePath, newFilePath);
  });
}

export default renameFiles;
