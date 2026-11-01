import * as fs from "node:fs";
import * as path from "node:path";
import multer from "multer";
import {nanoid} from "nanoid";

export const UPLOAD_FOLDER = path.resolve(process.cwd(), 'uploads/documents');

fs.mkdirSync(UPLOAD_FOLDER, {recursive: true});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
    filename: (req, file, cb) => cb(null, `${nanoid(16)}.pdf`)
});

export const upload = multer({
    storage,
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: (req, file, cb) => cb(null, file.mimetype === 'application/pdf')
});