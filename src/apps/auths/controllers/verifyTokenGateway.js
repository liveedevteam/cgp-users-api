import jwt from 'jsonwebtoken'

module.exports = async (req, res, next) => {
    const resObj = {
        status: 500,
        msg: "",
        results: null
    }
    const accessToken = req.header('Authorization')
    if (!accessToken) {
        resObj.status = 401
        resObj.msg = `Access token not found`
        resObj.results = {}
    } else if (accessToken) {
        try {
            const token = accessToken.split("Bearer ")[1]
            await jwt.verify(token, process.env.JWT_SECRET_KEY)
            next()
        } catch (error) {
            console.error(`Verify fail`)
            console.error(error)
            resObj.status = 401
            resObj.msg = `Verify token fail`
            resObj.results = {}
        }
    }

    res.status(resObj.status).json(resObj)
}