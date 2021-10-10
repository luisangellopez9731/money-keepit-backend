import Connection from "data/typeorm/Connection";

export const connection = Connection.getInstance();

export const createConnection = async () => {
  return await connection.create();
};

export default async () => {
  return await connection.get();
};
