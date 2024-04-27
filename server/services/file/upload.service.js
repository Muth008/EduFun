const multer = require("multer");
const path = require("path");

const uploadFolderPath = path.join(__dirname, "../../uploads/");

// Configure storage for file upload
function configureStorage(uploadPath) {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });
}

// Middleware to handle file upload
function uploadFileMiddleware(folder, imageProperty = "image") {
    const uploadPath = uploadFolderPath + folder;
    const storage = configureStorage(uploadPath);
    return multer({ storage }).single(imageProperty);
}

function handleUploadError(err, res) {
    return res.status(err.status ?? 500).json({ error: `[${err.code}] Failed to upload file` });
}

module.exports = {
    uploadFileMiddleware,
    handleUploadError,
};