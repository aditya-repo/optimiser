const { decompressFile } = require("../services/extract");

const extractor = (req, res) => {
  decompressFile(inputPath, outputPath);
};

export default extractor;
