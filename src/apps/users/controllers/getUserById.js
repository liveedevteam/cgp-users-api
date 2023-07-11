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

    if (!id) {
        resObj.status = 400
        resObj.msg = `ID was wrong`
        resObj.results = {}
    }
    else if (id) {
        const getQuery = `SELECT * FROM cgp.users WHERE id=$1`
        try {
            const conn = await db.connect()
            const user = await conn.query(getQuery, [id])
            resObj.status = 200
            resObj.msg = `Get user data id=${id} success`
            resObj.results = user.rows[0]
        } catch (error) {
            resObj.msg = `Get user data by id fail`
            resObj.results = error
        }
    }

    res.status(resObj.status).json(resObj)
}