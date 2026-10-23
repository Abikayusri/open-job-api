import {Router} from "express";
import {login, refreshAccessToken, logout} from "../controller/authentication-controller.js";
import validate from "../../../middlewares/validate.js";
import {postAuthenticationPayloadScheme, refreshTokenPayloadScheme} from "../validator/scheme.js";

const router = Router();

router.post('/authentications', validate(postAuthenticationPayloadScheme), login);
router.put('/authentications', validate(refreshTokenPayloadScheme), refreshAccessToken);
router.delete('/authentications', validate(refreshTokenPayloadScheme), logout);

export default router;
