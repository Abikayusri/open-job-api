import {Router} from "express";
import {addBookmark, deleteBookmark, getBookmarkById, getBookmarks} from "../controller/bookmark-controller.js";
import authenticateToken from "../../../middlewares/auth.js";

const router = Router();

router.post('/jobs/:jobId/bookmark', authenticateToken, addBookmark);
router.get('/bookmarks', authenticateToken, getBookmarks);
router.get('/jobs/:jobId/bookmark/:id', authenticateToken, getBookmarkById);
router.delete('/jobs/:jobId/bookmark', authenticateToken, deleteBookmark);

export default router;