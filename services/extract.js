const decompress = require("decompress");
const decompressTargz = require("decompress-targz");
const decompressUnzip = require("decompress-unzip");
const decompressTarBz2 = require("decompress-tarbz2");
const decompressTar = require("decompress-tar");
const decompressTarXz = require("decompress-tarxz");
const unrar = require("unrar-promise"); // Import unrar-promise

async function decompressFile(filePath, outputFolder) {
  const fileExtension = require("path").extname(filePath).toLowerCase();

  if (fileExtension === ".rar") {
    await decompressRar(filePath, outputFolder);
  } else {
    await decompressGeneric(filePath, outputFolder);
  }
}

async function decompressGeneric(filePath, outputFolder) {
  await decompress(filePath, outputFolder, {
    plugins: [
      decompressUnzip(),
      decompressTargz(),
      decompressTarBz2(),
      decompressTar(),
      decompressTarXz(),
    ],
  });
}

async function decompressRar(filePath, outputFolder) {
  try {
    await unrar.extract(filePath, outputFolder);
    console.log(`Extracted .rar file to ${outputFolder}`);
  } catch (error) {
    console.error("Error extracting .rar file:", error);
  }
}

module.exports = decompressFile;
