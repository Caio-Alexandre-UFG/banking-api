import { prisma } from "../prisma";

class StatementService {
  async deposit(
    idCheckingAccount: string,
    amount: number,
    description: string
  ) {
    try {
      if (amount <= 0) {
        throw new Error("Invalid amount.");
      }

      const statement = await prisma.statement.create({
        data: {
          idCheckingAccount,
          amount,
          description,
          type: "credit",
        },
      });
      return statement;
    } catch (error: any) {
      console.error(`Error creating deposit: ${error.message}`);
      throw new Error("Error creating deposit.");
    }
  }

  async getBalance(idCheckingAccount: string) {
    try {
      const aggregate = await prisma.statement.aggregate({
        _sum: {
          amount: true,
        },
        where: { idCheckingAccount },
      });
      return aggregate._sum.amount ?? 0;
    } catch (error: any) {
      console.error(`Error fetching balance: ${error.message}`);
      throw new Error("Error fetching balance.");
    }
  }

  async withdraw(
    idCheckingAccount: string,
    amount: number,
    description: string
  ) {
    try {
      const withdraw = await this.createDebit(
        idCheckingAccount,
        amount,
        description
      );
      return withdraw;
    } catch (error: any) {
      console.error(`Error creating withdraw: ${error.message}`);
      throw new Error("Error creating withdraw.");
    }
  }

  async getAll(idCheckingAccount: string) {
    try {
      const statement = await prisma.statement.findMany({
        where: { idCheckingAccount },
        orderBy: { createdAt: "desc" },
      });
      return statement;
    } catch (error: any) {
      console.error(`Error fetching statement: ${error.message}`);
      throw new Error("Error fetching statement.");
    }
  }

  async getById(id: string) {
    try {
      const statement = await prisma.statement.findUnique({
        where: { id },
      });
      return statement;
    } catch (error: any) {
      console.error(`Error fetching statement: ${error.message}`);
      throw new Error("Error fetching statement.");
    }
  }

  async getByPeriod(idCheckingAccount: string, startDate: Date, endDate: Date) {
    try {
      const statement = await prisma.statement.findMany({
        where: {
          idCheckingAccount,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: { createdAt: "desc" },
      });
      return statement;
    } catch (error: any) {
      console.error(`Error fetching statement by period: ${error.message}`);
      throw new Error("Error fetching statement by period.");
    }
  }

  async pix(idCheckingAccount: string, amount: number, description: string) {
    try {
      const pix = await this.createDebit(
        idCheckingAccount,
        amount,
        `PIX - ${description}`
      );
      return pix;
    } catch (error: any) {
      console.error(`Error creating pix: ${error.message}`);
      throw new Error("Error creating pix.");
    }
  }

  async ted(idCheckingAccount: string, amount: number, description: string) {
    try {
      const ted = await this.createDebit(
        idCheckingAccount,
        amount,
        `TED - ${description}`
      );
      return ted;
    } catch (error: any) {
      console.error(`Error creating ted: ${error.message}`);
      throw new Error("Error creating ted.");
    }
  }

  private async createDebit(
    idCheckingAccount: string,
    amount: number,
    description: string
  ) {
    try {
      if (amount <= 0) {
        throw new Error("Invalid amount.");
      }

      const balance = await this.getBalance(idCheckingAccount);

      if (amount > balance) {
        throw new Error("Insufficient funds.");
      }

      const statement = await prisma.statement.create({
        data: {
          idCheckingAccount,
          amount: amount * -1,
          description,
          type: "debit",
        },
      });
      return statement;
    } catch (error: any) {
      console.error(`Error creating debit: ${error.message}`);
      throw new Error("Error creating debit.");
    }
  }
}

export { StatementService };
