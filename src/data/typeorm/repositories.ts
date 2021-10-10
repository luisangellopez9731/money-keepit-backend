import { EntityTarget, Connection } from "typeorm";
import { Account, Category, Transaction, User, Workspace } from "./entity";

function getRepository_<T>(connection: Connection, entity: EntityTarget<T>) {
  return connection.getRepository(entity);
}

export const UserRepository = (conn: Connection) => getRepository_(conn, User);
export const AccountRepository = (conn: Connection) =>
  getRepository_(conn, Account);
export const CategoryRepository = (conn: Connection) =>
  getRepository_(conn, Category);
export const WorkspaceRepository = (conn: Connection) =>
  getRepository_(conn, Workspace);
export const TransactionRepository = (conn: Connection) =>
  getRepository_(conn, Transaction);
