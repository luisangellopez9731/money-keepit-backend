import { EntityTarget, getRepository } from "typeorm";

import { Account, Category, Transaction, User, Workspace } from "./entity";

function getRepository_(entity: EntityTarget<any>) {
  return () => getRepository(entity);
}

export const AccountRepository = getRepository_(Account);
export const CategoryRepository = getRepository_(Category);
export const TransactionRepository = getRepository_(Transaction);
export const UserRepository = getRepository_(User);
export const WorkspaceRepository = getRepository_(Workspace);
