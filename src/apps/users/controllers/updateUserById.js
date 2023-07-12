import { db } from '../../../libs/database';

module.exports = async (req, res) => {
    const resObj = {
        status: 500,
        msg: "",
        results: null
    }
    const {
        id,
        email,
        name
    } = req.body
    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let conn

    if (!id || !email || !name || !email.match(reg)) {
        resObj.status = 400
        resObj.msg = `Body was wrong`
        resObj.results = {}
    }
    else if (id && email && name && email.match(reg)) {
        const updateQuery = `UPDATE cgp.users SET email=$1, name=$2 WHERE id=$3`
        try {
            conn = await db.connect()
            await conn.query('BEGIN')
            const user = await conn.query(updateQuery, [email, name, id])
            if (user.rowCount > 0) {
                await conn.query('COMMIT')
                resObj.status = 200
                resObj.msg = `Update user data success`
                resObj.results = {}
            } else {
                resObj.status = 404
                resObj.msg = `ID is not match`
                resObj.results = {}
            }
        } catch (error) {
            console.error(error)
            await conn.query('ROLLBACK')
            resObj.msg = `Update user fail`
            resObj.results = error
        } finally {
            conn.release()
        }
    }

    res.status(resObj.status).json(resObj)
}