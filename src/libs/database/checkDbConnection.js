// checkDbConnection.ts
import db from './db';

const checkDbConnection = async () => {
    let conn;
    try {
        conn = await db.connect();
        const res = await db.query('SELECT $1::text as message', ['Connect DB Success!']);
        console.log(res.rows[0].message);
    } catch (error) {
        console.error(`Connection Fail`)
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

export default checkDbConnection;
