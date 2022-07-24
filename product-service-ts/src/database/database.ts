import { Pool, PoolConfig } from "pg"

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD, } = process.env;
const poolConfig: PoolConfig = {
    host: PG_HOST,
    port: +PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
}

export const dbConection = new Pool(poolConfig);