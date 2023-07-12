import {
    verifyTokenGateway
} from '../auths/controllers';
import {
    createUser,
    updateUserById,
    getUserById,
    getUserList,
    searchUserByName
} from './controllers';

export function setup(router) {
    router
        .get(`/search`, verifyTokenGateway, searchUserByName)
        .get(`/:id`, verifyTokenGateway, getUserById)
        .get(`/`, verifyTokenGateway, getUserList)
        .post(`/`, verifyTokenGateway, createUser)
        .put(`/`, verifyTokenGateway, updateUserById)
}