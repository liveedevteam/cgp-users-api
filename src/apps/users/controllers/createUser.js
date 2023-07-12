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
    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email || !name || !email.match(reg)) {
        resObj.status = 400
        resObj.msg = `Body was wrong`
        resObj.results = {}
    }
    else if (email && name && email.match(reg)) {
        const insertQuery = `INSERT INTO cgp.users(email, name) VALUES ($1, $2)`
        let conn
        try {
            conn = await db.connect()
            await conn.query(insertQuery, [email, name])
            resObj.status = 201
            resObj.msg = `Create user success`
            resObj.results = {}
        } catch (error) {
            resObj.msg = `Create user fail`
            resObj.results = error
        } finally {
            conn.release()
        }
    }

    res.status(resObj.status).json(resObj)
}