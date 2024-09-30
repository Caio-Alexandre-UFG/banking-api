import { prisma } from "../prisma";

class CheckingAccountService {
  async create(name: string, email: string, number: string) {
    try {
      const checkingAccount = await prisma.checkingAccount.create({
        data: {
          name,
          email,
          number,
        },
      });
      return checkingAccount;
    } catch (error: any) {
      console.error(`Error creating checking account: ${error.message}`);
      throw new Error("Error creating checking account.");
    }
  }

  async update(id: string, name: string, email: string, number: string) {
    try {
      const checkingAccount = await prisma.checkingAccount.update({
        where: { id },
        data: {
          name,
          email,
          number,
        },
      });
      return checkingAccount;
    } catch (error: any) {
      console.error(`Error updating checking account: ${error.message}`);
      throw new Error("Error updating checking account.");
    }
  }

  async delete(id: string) {
    try {
      await prisma.checkingAccount.delete({
        where: { id },
      });
    } catch (error: any) {
      console.error(`Error deleting checking account: ${error.message}`);
      throw new Error("Error deleting checking account.");
    }
  }

  async getAll() {
    try {
      const checkingAccounts = await prisma.checkingAccount.findMany({
        orderBy: {
          name: "asc",
        },
      });
      return checkingAccounts;
    } catch (error: any) {
      console.error(`Error fetching checking accounts: ${error.message}`);
      throw new Error("Error fetching checking accounts.");
    }
  }

  async getById(id: string) {
    try {
      const checkingAccount = await prisma.checkingAccount.findUnique({
        where: { id },
      });
      return checkingAccount;
    } catch (error: any) {
      console.error(`Error fetching checking account: ${error.message}`);
      throw new Error("Error fetching checking account.");
    }
  }

  async getByName(name: string) {
    try {
      const checkingAccounts = await prisma.checkingAccount.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
        orderBy: {
          name: "asc",
        },
      });
      return checkingAccounts;
    } catch (error: any) {
      console.error(
        `Error fetching checking accounts by name: ${error.message}`
      );
      throw new Error("Error fetching checking accounts by name.");
    }
  }
}

export { CheckingAccountService };
