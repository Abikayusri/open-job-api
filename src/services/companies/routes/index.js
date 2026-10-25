import {Router} from "express";
import {createCompany, getCompanies, getCompanyById, editCompany, deleteCompany} from "../controller/company-controller.js";
import validate from "../../../middlewares/validate.js";
import authenticateToken from "../../../middlewares/auth.js";
import {companyPayloadScheme} from "../validator/scheme.js";

const router = Router();

router.post('/companies', authenticateToken, validate(companyPayloadScheme), createCompany);
router.get('/companies', getCompanies);
router.get('/companies/:id', getCompanyById);
router.put('/companies/:id', authenticateToken, validate(companyPayloadScheme), editCompany);
router.delete('/companies/:id', authenticateToken, deleteCompany);

export default router;
