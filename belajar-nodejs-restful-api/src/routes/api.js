import express from "express";
import { createContact, getContactById, removeContactById, searchContactById, updateContactById } from "../handler/contact-controller.js";
import {
  findByUsername,
  logout,
  updateByUsername,
} from "../handler/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = express.Router();

// User API
userRouter.use(authMiddleware);
userRouter.get("/api/users/current", findByUsername);
userRouter.patch("/api/users/current", updateByUsername);
userRouter.delete("/api/users/logout", logout);

// Contact API
userRouter.post("/api/contacts", createContact);
userRouter.get("/api/contacts/", searchContactById);
userRouter.get("/api/contacts/:contactId", getContactById);
userRouter.put("/api/contacts/:contactId", updateContactById);
userRouter.delete("/api/contacts/:contactId", removeContactById);

export { userRouter };
