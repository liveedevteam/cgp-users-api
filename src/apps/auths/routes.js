export function setup(router) {
    router
        .get(`/verify`, (req, res) => { res.send("verify token") })
}