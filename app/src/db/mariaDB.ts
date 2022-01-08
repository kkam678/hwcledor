import * as mariadb from 'mariadb';
import * as env from 'dotenv';
import {Pool} from "mariadb";
import db from "./db";

env.config();

// Connecting to the database
class MariaDB implements db{

    private static instance: MariaDB;
    private pool: mariadb.Pool;
    private constructor() { }

    public static getInstance(): MariaDB {
        if (!MariaDB.instance) {
            MariaDB.instance = new MariaDB();
        }

        return MariaDB.instance;
    }

    public getConnectionPool(): Pool {
        if(!this.pool){
            this.pool = mariadb.createPool({
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASS,
                connectionLimit: 100,
            });
        }
        return this.pool;
    }
}

export default MariaDB;
