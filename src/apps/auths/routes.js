import {
    verifyToken,
    generateToken
} from "./controllers"

export function setup(router) {
    router
        .get(`/token/generate`, generateToken)
        .get(`/token/verify`, verifyToken)
}