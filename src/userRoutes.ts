import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";

const userRoutes = Router();
const userController = new UserController();
const authController = new AuthController();

const basePath = "/users";

userRoutes.use(authController.authMiddleware);

userRoutes.post(basePath, userController.create);
userRoutes.get(basePath, userController.getAll);
userRoutes.get(`${basePath}/:id`, userController.getById);
userRoutes.delete(
  `${basePath}/:id`,
  userController.verifyIfExists,
  userController.delete
);
userRoutes.put(
  `${basePath}/:id`,
  userController.verifyIfExists,
  userController.update
);

userRoutes.post("/auth", authController.authenticate);

export { userRoutes };
