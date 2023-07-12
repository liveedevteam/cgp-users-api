import { db } from '../../../libs/database';

module.exports = async (req, res) => {
    const resObj = {
        status: 500,
        msg: "",
        results: null
    }
    let {
        page,
        size
    } = req.query
    let conn

    if (!page) page = 1
    if (!size) size = 10
   
    const getQuery = `SELECT * FROM cgp.users LIMIT $2 OFFSET(($1-1)*$2)`
    try {
        conn = await db.connect()
        const users = await conn.query(getQuery, [page, size])
        resObj.status = 200
        resObj.msg = `get user data list page=${page} size=${size} success`
        resObj.results = users.rows
    } catch (error) {
        console.error(error)
        resObj.msg = `Get user data list fail`
        resObj.results = error
    } finally {
        conn.release()
    }

    res.status(resObj.status).json(resObj)
}