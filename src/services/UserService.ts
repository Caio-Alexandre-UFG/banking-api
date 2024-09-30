import { hash } from "bcryptjs";
import { prisma } from "../prisma";

class UserService {
  async create(name: string, email: string, password: string) {
    try {
      const userExist = await prisma.user.findUnique({
        where: { email },
      });
      if (userExist) {
        throw new Error("User already exists in the database.");
      }

      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error: any) {
      console.error(`Error creating user: ${error.message}`);
      throw new Error("Error creating user.");
    }
  }

  async getAll() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return users;
    } catch (error: any) {
      console.error(`Error fetching users: ${error.message}`);
      throw new Error("Error fetching users.");
    }
  }

  async getById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error: any) {
      console.error(`Error fetching user: ${error.message}`);
      throw new Error("Error fetching user.");
    }
  }

  async delete(id: string) {
    try {
      await prisma.user.delete({
        where: { id },
      });
    } catch (error: any) {
      console.error(`Error deleting user: ${error.message}`);
      throw new Error("Error deleting user.");
    }
  }

  async update(id: string, name: string, email: string, password: string) {
    try {
      const hashedPassword = await hash(password, 10);
      const user = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error: any) {
      console.error(`Error updating user: ${error.message}`);
      throw new Error("Error updating user.");
    }
  }
}

export { UserService };
