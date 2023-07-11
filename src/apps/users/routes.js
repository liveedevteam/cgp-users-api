import {
    verifyTokenGateway
} from '../auths/controllers';
import {
    createUser,
    updateUserById,
    getUserById,
    getUserList
} from './controllers';

export function setup(router) {
    router
        .get(`/:id`, verifyTokenGateway, getUserById)
        .get(`/`, verifyTokenGateway, getUserList)
        .post(`/`, verifyTokenGateway, createUser)
        .put(`/`, verifyTokenGateway, updateUserById)
}