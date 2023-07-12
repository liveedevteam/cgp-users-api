import { db } from '../../../libs/database';

module.exports = async (req, res) => {
    const resObj = {
        status: 500,
        msg: "",
        results: null
    }
    const {
        email,
        name
    } = req.body
    let conn

    if (!email || !name) {
        resObj.status = 400
        resObj.msg = `Body was wrong`
        resObj.results = {}
    }
    else if (email && name) {
        const updateQuery = `UPDATE cgp.users SET email=$1, name=$2 WHERE id=$3`
        try {
            conn = await db.connect()
            const newUser = await conn.query(updateQuery, [email, name, id])
            resObj.status = 200
            resObj.msg = `Update user data success`
            resObj.results = {
                id: newUser.rows[0].id
            }
        } catch (error) {
            resObj.msg = `Update user fail`
            resObj.results = error
        } finally {
            conn.release()
        }
    }

    res.status(resObj.status).json(resObj)
}