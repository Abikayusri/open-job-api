import {Router} from "express";
import {
    createApplication, getApplications, getApplicationById, getApplicationsByUserId,
    getApplicationsByJobId, editApplicationStatus, deleteApplication
} from "../controller/application-controller.js";
import validate from "../../../middlewares/validate.js";
import authenticateToken from "../../../middlewares/auth.js";
import {applicationPayloadScheme, applicationStatusPayloadScheme} from "../validator/scheme.js";

const router = Router();

router.post('/applications', authenticateToken, validate(applicationPayloadScheme), createApplication);
router.get('/applications', authenticateToken, getApplications);
router.get('/applications/user/:userId', authenticateToken, getApplicationsByUserId);
router.get('/applications/job/:jobId', authenticateToken, getApplicationsByJobId);
router.get('/applications/:id', authenticateToken, getApplicationById);
router.put('/applications/:id', authenticateToken, validate(applicationStatusPayloadScheme), editApplicationStatus);
router.delete('/applications/:id', authenticateToken, deleteApplication);

export default router;
