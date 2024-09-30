import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { CheckingAccountService } from "./CheckingAccountService";

class CheckingAccountController {
  private checkingAccountService: CheckingAccountService;

  constructor() {
    this.checkingAccountService = new CheckingAccountService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const { name, email, number } = req.body;

      const validation = this.isValidNameAndEmailAndNumber(name, email, number);
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.msg });
      }

      const checkingAccount = await this.checkingAccountService.create(
        name,
        email,
        number
      );
      return res.status(201).json(checkingAccount);
    } catch (error) {
      this.handleError(res, error, "Error creating checking account.");
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const checkingAccounts = await this.checkingAccountService.getAll();
      return res.status(200).json(checkingAccounts);
    } catch (error) {
      this.handleError(res, error, "Error fetching checking accounts.");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const idCheckingAccount = req.params.id;
      const checkingAccount = await this.checkingAccountService.getById(
        idCheckingAccount
      );
      if (!checkingAccount) {
        return res.status(404).json({ error: "Checking account not found." });
      }
      return res.status(200).json(checkingAccount);
    } catch (error) {
      this.handleError(res, error, "Error fetching checking account by ID.");
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const idCheckingAccount = req.params.id;
      const { name, email, number } = req.body;

      const validation = this.isValidNameAndEmailAndNumber(name, email, number);
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.msg });
      }

      const checkingAccount = await this.checkingAccountService.update(
        idCheckingAccount,
        name,
        email,
        number
      );
      return res.status(200).json(checkingAccount);
    } catch (error) {
      this.handleError(res, error, "Error updating checking account.");
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const idCheckingAccount = req.params.id;
      await this.checkingAccountService.delete(idCheckingAccount);
      return res.status(204).send();
    } catch (error) {
      this.handleError(res, error, "Error deleting checking account.");
    }
  };

  verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const checkingAccount = await this.checkingAccountService.getById(id);

      if (!checkingAccount) {
        return res.status(404).json({ error: "Checking account not found." });
      }
      return next();
    } catch (error) {
      this.handleError(
        res,
        error,
        "Error verifying if checking account exists."
      );
    }
  };

  getByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.query;
      const checkingAccount = await this.checkingAccountService.getByName(
        name as string
      );
      return res.status(200).json(checkingAccount);
    } catch (error) {
      this.handleError(res, error, "Error fetching checking account by name.");
    }
  };

  private isValidNameAndEmailAndNumber(name: any, email: any, number: any) {
    if (typeof name !== "string" || name.trim().length === 0) {
      return {
        isValid: false,
        msg: "Invalid name: must be a non-empty string.",
      };
    }
    if (typeof email !== "string" || email.trim().length === 0) {
      return {
        isValid: false,
        msg: "Invalid email: must be a non-empty string.",
      };
    }
    if (typeof number !== "string" || number.trim().length === 0) {
      return {
        isValid: false,
        msg: "Invalid number: must be a non-empty string.",
      };
    }
    return { isValid: true };
  }

  private handleError(res: Response, error: unknown, msg: string) {
    if (error instanceof Error) {
      console.error(`${msg} ${error.message}`);
      return res.status(400).json({ error: error.message });
    } else {
      console.error(`Unexpected error: ${error}`);
      return res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
}

export { CheckingAccountController };
