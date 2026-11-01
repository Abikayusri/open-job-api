import * as path from "node:path";
import * as fs from "node:fs";
import DocumentRepositories from "../repositories/document-repositories.js";
import response from "../../../utils/response.js";
import {InvariantError, NotFoundError} from "../../../exceptions/index.js";
import {UPLOAD_FOLDER} from "../storage/storage-config.js";

export const uploadDocument = async (req, res, next) => {
    if (!req.file) {
        return next(new InvariantError('File is required and must be PDF!'))
    }

    const {filename, originalname: originalName, size} = req.file;

    const document = await DocumentRepositories.createDocument({
        userId: req.user.id,
        filename,
        originalName,
        size
    });

    return response(res, 201, 'Dokumennya berhasil diunggah', {
        documentId: document.id,
        filename,
        originalName,
        size
    });
};

export const getDocuments = async (req, res) => {
    const documents = await DocumentRepositories.getDocuments();

    return response(res, 200, 'Dokumennya berhasil ditampilkan', {documents})
};

export const getDocumentById = async (req, res, next) => {
    const document = await DocumentRepositories.getDocumentById(req.params.id);

    if (!document) {
        return next(new NotFoundError('Dokumennya tidak ditemukan'))
    }

    res.setHeader('Content-Disposition', `inline; filename="${document.filename}"`);
    return res.sendFile(path.join(UPLOAD_FOLDER, document.filename));
};

export const deleteDocument = async (req, res, next) => {
    const document = await DocumentRepositories.deleteDocument(req.params.id, req.user.id);

    if (!document) {
        return next(new NotFoundError('Gagal menghapus dokumen. Id tidak ditemukan'));
    }

    await fs.rm(path.join(UPLOAD_FOLDER, document.filename), {force: true});

    return response(res, 200, 'Dokumen berhasil dihapus', {id: document.id});
};