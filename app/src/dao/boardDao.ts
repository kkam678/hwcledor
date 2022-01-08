import MariaDB from "../db/mariaDB";
import {Pool, PoolConnection} from "mariadb";
import Board from "../models/boardModel";
import BoardContent from "../models/boardContentModel";

export default class BoardDao {
    db: MariaDB
    pool: Pool

    constructor() {
        this.db = MariaDB.getInstance();
        this.pool = this.db.getConnectionPool();
    }

    async getList(board_id, page, limit) {
        const connection = await this.pool.getConnection();
        // await connection.beginTransaction();

        try {
            const offset = (page - 1) * limit;
            const query = " SELECT * FROM board_content " +
                " WHERE board_id = ? " +
                " LIMIT ? OFFSET ? ";
            let [rows, fields] = await connection.query(query, [board_id, parseInt(limit), offset]);
            // await connection.commit();
            return rows;
            // if(result)
            // return result[];
        } catch (err) {
            // await connection.rollback();
            return err;
        } finally {
            console.log('finally!!!');
            await connection.release();
        }
    }

    async getListCount(board_id) {
        const connection = await this.pool.getConnection();
        // await connection.beginTransaction();

        try {
            const countQuery = " SELECT count(id) AS count FROM board_content " +
                " WHERE board_id = ? ";
            let [rows] = await connection.query(countQuery, [board_id]);
            // await connection.commit();
            return rows;
            // if(result)
            // return result[];
        } catch (err) {
            // await connection.rollback();
            return err;
        } finally {
            console.log('finally!!!');
            await connection.release();
        }
    }

    async getDetail(id) {
        const connection = await this.pool.getConnection();
        // await connection.beginTransaction();

        try {
            const query = " SELECT * FROM board_content " +
                " WHERE id = ? ";
            let [rows, fields] = await connection.query(query, [id]);
            // await connection.commit();
            return rows;
            // if(result)
            // return result[];
        } catch (err) {
            // await connection.rollback();
            return err;
        } finally {
            console.log('finally!!!');
            await connection.release();
        }
    }

    async insertBoardContent(board: BoardContent) {
        const connection = await this.pool.getConnection();
        // await connection.beginTransaction();

        try {
            const query = " INSERT INTO board_content(board_id,user_name,password,title,content,ip,created_at,updated_at)" +
                " VALUES (?,?,?,?,?,INET_ATON(?),NOW(),NOW()) ";
            let [result] = await connection.query(query, [board.boardId, board.userName, board.password, board.title, board.content, board.ip]);

            if (result) {
                return result.insertId > 0;
            } else {
                return false;
            }

            // await connection.commit();
            // if(result)
            // return result[];
        } catch (err) {
            // await connection.rollback();
            return err;
        } finally {
            await connection.release();
        }
    }

    async updateBoardContent(board: BoardContent) {
        const connection = await this.pool.getConnection();
        // await connection.beginTransaction();

        try {
            const query = " UPDATE board_content SET" +
                " title = ? , " +
                " content = ? " +
                " where id = ?";
            let [result] = await connection.query(query, [board.title, board.content, board.id]);

            if (result) {
                return result.insertId > 0;
            } else {
                return false;
            }

            // await connection.commit();
            // if(result)
            // return result[];
        } catch (err) {
            // await connection.rollback();
            return err;
        } finally {
            await connection.release();
        }
    }

    async deleteBoardContent(board: BoardContent) {
        const connection = await this.pool.getConnection();
        // await connection.beginTransaction();

        try {
            const query = " DELETE FROM board_content WHERE id = ? ";
            let [result] = await connection.query(query, [board.id]);

            if (result) {
                return result.insertId > 0;
            } else {
                return false;
            }

            // await connection.commit();
            // if(result)
            // return result[];
        } catch (err) {
            // await connection.rollback();
            return err;
        } finally {
            await connection.release();
        }
    }


}