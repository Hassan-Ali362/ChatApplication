// multer is a middleware to handle extract and process file uploads (multipart/form-data) in Express.js applications.

import multer from "multer";

const storage = multer.memoryStorage(); // store files in memory
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;


// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith("image/")) {      // mimmi filter to allow only image files. It checks the MIME type of the uploaded file and only accepts it if it starts with "image/". If the file is not an image, it calls the callback with an error, which will prevent the file from being uploaded and processed further.
//       cb(new Error("Only image files are allowed"), false);
//     } else {
//       cb(null, true);
//     }
//   },
// });
