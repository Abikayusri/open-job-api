import {Router} from "express";
import {login, logout, refreshAccessToken} from "../controller/authentication-controller.js";
import validate from "../../../middlewares/validate.js";
import {postAuthenticationPayloadScheme, refreshTokenPayloadScheme} from "../validator/scheme.js";
import authenticateToken from "../../../middlewares/auth.js";

const router = Router();

router.post('/authentications', validate(postAuthenticationPayloadScheme), login);
router.put('/authentications', validate(refreshTokenPayloadScheme), refreshAccessToken);
router.delete('/authentications', authenticateToken, validate(refreshTokenPayloadScheme), logout);

export default router;
