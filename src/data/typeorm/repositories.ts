import { EntityTarget, Connection } from "typeorm";
import { Account, Category, Transaction } from "./entity";

async function getRepository_<T>(
  connection: Connection | Promise<Connection>,
  entity: EntityTarget<T>
) {
  const conn = await connection;
  return conn.getRepository(entity);
}

export const AccountRepository = (conn: Promise<Connection>) =>
  getRepository_(conn, Account);
export const CategoryRepository = (conn: Promise<Connection>) =>
  getRepository_(conn, Category);
export const TransactionRepository = (conn: Promise<Connection>) =>
  getRepository_(conn, Transaction);
