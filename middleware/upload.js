const util = require("util");
const multer = require("multer");
const maxSize = 3 * 1024 * 1024;

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var uploadedFileURL = "";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/src/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    dateTimeNow = Date.now();
    cb(null, `${dateTimeNow}-${file.originalname}`);
    console.log("/src/resources/static/assets/uploads/"+dateTimeNow+"-"+file.originalname);
  },
  
});



let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: imageFilter
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;