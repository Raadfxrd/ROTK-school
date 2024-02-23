import { PoolConnection, Pool, createPool } from "mysql2/promise";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

let connectionPool: Pool;

export function getConnection(): Promise<PoolConnection> {
    if (!connectionPool) {
        connectionPool = createPool({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT as string),
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT as string),
        });
    }

    return connectionPool.getConnection();
}

export function queryDatabase<T = any>(connection: Connection, query: string, ...values: any[]): T {
    const queryResult: any = connection.query(query, values);

    return queryResult[0] as T;
}
