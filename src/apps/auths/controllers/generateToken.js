import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

module.exports = async (req, res) => {
    const resObj = {
        status: 500,
        msg: "",
        results: null
    }
    const xApiKey = req.header("X-Api-Key")

    if (!xApiKey) {
        resObj.status = 401
        resObj.msg = `X-Api-Key not found`
        resObj.results = {}
    }

    else if (xApiKey) {
        if (xApiKey !== process.env.X_API_KEY) {
            resObj.status = 401
            resObj.msg = `X-Api-Key wrong`
            resObj.results = {}
        } else if (xApiKey === process.env.X_API_KEY) {
            const accessToken = jwt.sign({ sub: `${process.env.X_API_KEY}|||${dayjs.tz().format(`YYYY-MM-DDTHH:mm:ss`)}` }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' })
            resObj.status = 200
            resObj.msg = `Generate token success`
            resObj.results = {
                accessToken
            }
        }
    }

    return res.status(resObj.status).json(resObj)
}