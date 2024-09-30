import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ error: "User or password invalid." });
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({ error: "User or password invalid." });
      }

      const token = sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "1h" }
      );

      return res
        .status(200)
        .json({ user: { id: user.id, email: user.email }, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(401).json({ error: "Token not provided." });
      }
      return next();
    } catch (error) {
      res.status(401).json({ error: "Token invalid." });
    }
  }
}

export { AuthController };
