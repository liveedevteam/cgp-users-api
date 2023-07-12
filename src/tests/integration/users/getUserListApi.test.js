import supertest from 'supertest';
import express from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { generateToken, verifyToken, verifyTokenGateway } from '../../../apps/auths/controllers';
import {
    createUser,
    updateUserById,
    getUserById,
    getUserList,
    searchUserByName
} from '../../../apps/users/controllers';

dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.tz.setDefault("Asia/Bangkok")

const endpointUrl = "/api/users"
let firstUser
let accessToken
let mockName = `a`

describe(`GET ${endpointUrl}`, () => {
    describe('should get user list', () => {
        let request
        beforeEach(() => {
            jest.setTimeout(60000);
            const app = express();
            app.get("/api/auths/token/generate", generateToken);
            app.get("/api/auths/token/verify", verifyToken);
            app.get(endpointUrl, verifyTokenGateway, getUserList);
            app.get(`${endpointUrl}/:id`, verifyTokenGateway, getUserById);
            app.get(`${endpointUrl}/search?name=${mockName}`, verifyTokenGateway, searchUserByName);
            app.post(endpointUrl, verifyTokenGateway, createUser);
            app.put(endpointUrl, verifyTokenGateway, updateUserById);
            request = supertest(app);
        });

        test("Response with a 401", async () => {
            const response = await request.get("/api/users")
            // console.log(response)
            expect(response.statusCode).toBe(401)
        })

        test("Response with a 401", async () => {
            const response = await request.get("/api/auths/token/verify")
                .set('Authorization', "Bearer xjioehq[qwe")
            expect(response.statusCode).toBe(401)
        })

        test("Get User List Response with a 200", async () => {
            const getToken = await request.get("/api/auths/token/generate")
                .set('X-Api-Key', process.env.X_API_KEY)
            // console.log(getToken._body.results.accessToken)
            const users = await request.get("/api/users")
                .set('Authorization', `Bearer ${getToken._body.results.accessToken}`)
            expect(users.statusCode).toBe(200)
            expect(typeof users._body.results).toEqual("object")
            expect(Array.isArray(users._body.results)).toBeTruthy()
            expect(users._body.results[0].email).toBeDefined()
            expect(users._body.results[0].name).toBeDefined()
            firstUser = users._body.results[0]
            accessToken = getToken._body.results.accessToken
        })

        test("Get User by Id " + endpointUrl + "/:id", async () => {
            const response = await request.get(`${endpointUrl}/${firstUser.id}`)
                .set('Authorization', `Bearer ${accessToken}`)
            expect(response.statusCode).toBe(200);
            expect(response._body.results.email).toBe(firstUser.email);
            expect(response._body.results.name).toBe(firstUser.name);
        })

        test("Get User by Id " + endpointUrl + "/:id doesn't exist", async () => {
            const response = await request.get(`${endpointUrl}/3`)
                .set('Authorization', `Bearer ${accessToken}`)
            expect(response.statusCode).toBe(404);
        })
    });
});
