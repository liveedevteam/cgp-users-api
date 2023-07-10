export function setup(router) {
    router
        .get(`/:id`, (req, res) => { res.send("get user by id") })
        .post(`/`, (req, res) => { res.send("create user") })
        .put(`/`, (req, res) => { res.send("update user by id") })
}