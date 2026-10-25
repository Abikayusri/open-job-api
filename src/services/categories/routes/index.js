import {Router} from "express";
import {createCategory, getCategories, getCategoryById, editCategory, deleteCategory} from "../controller/category-controller.js";
import validate from "../../../middlewares/validate.js";
import authenticateToken from "../../../middlewares/auth.js";
import {categoryPayloadScheme} from "../validator/scheme.js";

const router = Router();

router.post('/categories', authenticateToken, validate(categoryPayloadScheme), createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', authenticateToken, validate(categoryPayloadScheme), editCategory);
router.delete('/categories/:id', authenticateToken, deleteCategory);

export default router;