import { EntityTarget, Connection } from "typeorm";

export async function getRepository<T>(
  connection: Connection,
  entity: EntityTarget<T>
) {
  return connection.getRepository(entity);
}
