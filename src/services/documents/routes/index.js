import {Router} from "express";
import {uploadDocument, getDocuments, getDocumentById, deleteDocument} from "../controller/document-controller.js";
import {upload} from "../storage/storage-config.js";
import authenticateToken from "../../../middlewares/auth.js";

const router = Router();

router.post('/documents', authenticateToken, upload.single('document'), uploadDocument);
router.get('/documents', getDocuments);
router.get('/documents/:id', getDocumentById);
router.delete('/documents/:id', deleteDocument);

export default router;