import { Router } from "express";
import { CheckingAccountController } from "./account/CheckingAccountController";
import { StatementController } from "./statement/StatementController";
import { AuthController } from "./auth/AuthController";

const routes = Router();

const checkingAccountController = new CheckingAccountController();
const statementController = new StatementController();
const authController = new AuthController();

const basePath = "/checkingaccounts";

routes.use(authController.authMiddleware);

routes.get(basePath, checkingAccountController.getAll);
routes.get(`${basePath}/searchByName`, checkingAccountController.getByName);
routes.get(`${basePath}/:id`, checkingAccountController.getById);
routes.post(basePath, checkingAccountController.create);
routes.put(
  `${basePath}/:id`,
  checkingAccountController.verifyIfExists,
  checkingAccountController.update
);
routes.delete(
  `${basePath}/:id`,
  checkingAccountController.verifyIfExists,
  checkingAccountController.delete
);

routes.post(
  `${basePath}/:id/deposit`,
  checkingAccountController.verifyIfExists,
  statementController.deposit
);
routes.get(
  `${basePath}/:id/statement`,
  checkingAccountController.verifyIfExists,
  statementController.getStatement
);
routes.get(
  `${basePath}/:id/balance`,
  checkingAccountController.verifyIfExists,
  statementController.getBalance
);
routes.post(
  `${basePath}/:id/withdraw`,
  checkingAccountController.verifyIfExists,
  statementController.withdraw
);
routes.get(
  `${basePath}/:id/statement/period`,
  checkingAccountController.verifyIfExists,
  statementController.getByPeriod
);
routes.post(
  `${basePath}/:id/pix`,
  checkingAccountController.verifyIfExists,
  statementController.pix
);
routes.post(
  `${basePath}/:id/ted`,
  checkingAccountController.verifyIfExists,
  statementController.ted
);

export { routes };
