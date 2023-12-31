import { db } from '../../../libs/database';

module.exports = async (req, res) => {
    const resObj = {
        status: 500,
        msg: "",
        results: null
    }
    const {
        id
    } = req.params
    let conn

    if (!id) {
        resObj.status = 400
        resObj.msg = `ID was wrong`
        resObj.results = {}
    }
    else if (id) {
        const getQuery = `SELECT * FROM cgp.users WHERE id=$1`
        try {
            conn = await db.connect()
            const user = await conn.query(getQuery, [id])
            if (user.rowCount > 0) {
                resObj.status = 200
                resObj.msg = `Get user data id=${id} success`
                resObj.results = user.rows[0]
            } else {
                resObj.status = 404
                resObj.msg = `Get user data id=${id} not found`
                resObj.results = {}
            }
        } catch (error) {
            resObj.msg = `Get user data by id fail`
            resObj.results = error
        } finally {
            conn.release()
        }
    }

    res.status(resObj.status).json(resObj)
}