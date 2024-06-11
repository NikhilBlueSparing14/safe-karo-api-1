// import multer from 'multer';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, 'uploads/images');
//         } else if (file.mimetype === 'application/pdf') {
//             cb(null, 'uploads/documents');
//         } else {
//             cb(new Error('Unsupported file type! Please upload an image or a PDF document.'), false);
//         }
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
//         cb(null, uniqueSuffix);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('Unsupported file type! Please upload an image or a PDF document.'), false);
//     }
// };

// const upload = multer({
//     storage,
//     limits: { fileSize: 1024 * 1024 * 5 },
//     fileFilter,
// }).any();

// const uploadMiddleware = (req, res, next) => {
//     upload(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ message: err.message });
//         }
//         next();
//     });
// };

// export default uploadMiddleware;

import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.memoryStorage(); // Store files in memory instead of disk

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type! Please upload an image or a PDF document.'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
    fileFilter,
}).any(); // Accept any files

const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

export default uploadMiddleware;
