import moveFilesToSingleFolder from "../services/merge";

const merger = (req, res) => {
  moveFilesToSingleFolder(inputPath, outputPath);
};

export default merger;
