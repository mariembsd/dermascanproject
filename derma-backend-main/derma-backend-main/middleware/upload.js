import multer from 'multer';
import path from 'path';
// const storage = multer.diskStorage({
//  destination: function (req, file, cb) {
//   cb(null, 'uploads/'); 
//  },
//  filename: function (req, file, cb) {
//   const uniqueSuffix = Date.now() + '-' + file.originalname;
//   cb(null, uniqueSuffix);
//  }
// });

// const upload = multer({ storage });

// export default upload;


const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, 'uploads/');
 },
 filename: function (req, file, cb) {
  const ext = path.extname(file.originalname); // This gives .png, .jpg, etc.
  const baseName = path.basename(file.originalname, ext);
  const uniqueName = `${Date.now()}-${baseName}${ext}`;
  cb(null, uniqueName);
 }
});

const upload = multer({ storage });

 export default upload;
