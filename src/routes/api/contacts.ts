import { Router } from "express";
import {
  validation,
  ctrlWrapper,
  isValidId,
  authToken,
} from "../../middlewares";

import { joiSchemaContact, statusJoiSchemaContact } from "../../models/contact";
import { contacts as ctrlContacts } from "../../controllers";

const routerContacts = Router();

routerContacts.get("/", authToken, ctrlWrapper(ctrlContacts.getAll));

routerContacts.get("/:contactId", authToken, isValidId, ctrlWrapper(ctrlContacts.getById));

routerContacts.post("/", authToken, validation(joiSchemaContact), ctrlWrapper(ctrlContacts.add));

routerContacts.delete(
  "/:contactId",
  authToken,
  validation(joiSchemaContact),
  ctrlWrapper(ctrlContacts.removeById)
);

routerContacts.put("/:contactId", isValidId, ctrlWrapper(ctrlContacts.updateById));
routerContacts.patch(
  "/:contactId/favorite",
  authToken,
  validation(statusJoiSchemaContact),
  ctrlWrapper(ctrlContacts.updateStatusContact)
);


export default routerContacts