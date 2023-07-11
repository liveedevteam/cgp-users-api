import generateToken from "./controllers/generateToken"

export function setup(router) {
    router
        .get(`/token/generate`, generateToken)
        .get(`/token/verify`, (req, res) => { res.send("verify token") })
}