import {
    verifyTokenGateway
} from '../auths/controllers';

export function setup(router) {
    router
        .get(`/:id`, verifyTokenGateway, (req, res) => { res.send("get user by id") })
        .get(`/`, verifyTokenGateway, (req, res) => { res.send("get user by id") })
        .post(`/`, verifyTokenGateway, createUser)
        .put(`/`, verifyTokenGateway, (req, res) => { res.send("update user by id") })
}