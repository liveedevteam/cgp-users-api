import { db } from '../../../libs/database';

module.exports = async (req, res) => {
    const resObj = {
        status: 500,
        msg: "",
        results: null
    }
    const {
        name
    } = req.query
    let conn

    if (!name) {
        resObj.status = 400
        resObj.msg = `Please enter name`
        resObj.results = {}
    } else if (name) {
        const getQuery = `SELECT * FROM cgp.users WHERE name ILIKE $1`;
        try {
            conn = await db.connect()
            const user = await db.query(getQuery, ['%' + name + '%']);

            if (user.rowCount > 0) {
                resObj.status = 200
                resObj.msg = `Get user data by name=${name} success`
                resObj.results = user.rows
            } else {
                resObj.status = 404
                resObj.msg = `Get user data by name=${name} not found`
                resObj.results = {}
            }
        } catch (error) {
            console.error(error)
            resObj.msg = `Get user data by name=${name} fail`
            resObj.results = error
        } finally {
            conn.release()
        }

        res.status(resObj.status).json(resObj)
    }
}