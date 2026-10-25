import {Router} from "express";
import {createJob, getJobs, getJobById, getJobsByCompanyId, getJobsByCategoryId, editJob, deleteJob} from "../controller/job-controller.js";
import validate, {validateQuery} from "../../../middlewares/validate.js";
import authenticateToken from "../../../middlewares/auth.js";
import {jobPayloadScheme, jobQueryScheme} from "../validator/scheme.js";

const router = Router();

router.post('/jobs', authenticateToken, validate(jobPayloadScheme), createJob);
router.get('/jobs', validateQuery(jobQueryScheme), getJobs);
router.get('/jobs/company/:companyId', getJobsByCompanyId);
router.get('/jobs/category/:categoryId', getJobsByCategoryId);
router.get('/jobs/:id', getJobById);
router.put('/jobs/:id', authenticateToken, validate(jobPayloadScheme), editJob);
router.delete('/jobs/:id', authenticateToken, deleteJob);

export default router;
