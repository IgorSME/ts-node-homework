import {Router} from 'express';
import {
  validation,
  ctrlWrapper,
  upload,
  authToken,
} from "../../middlewares";

import { auth as ctrl } from "../../controllers";
import { joiSchema, joiSchemaSubscription } from "../../models/user";

const router:Router = Router();

router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", authToken, ctrlWrapper(ctrl.getCurrent));
router.post("/logout", authToken, ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  authToken,
  validation(joiSchemaSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  authToken,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", ctrlWrapper(ctrl.verify));


export default router