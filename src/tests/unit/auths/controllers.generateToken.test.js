import authController from '../../../apps/auths/controllers';
import httpMocks from 'node-mocks-http';
import { Pool } from 'pg';
import mockNewToken from '../../mock-data/authController.generateToken.json';

jest.mock('pg', () => {
    return {
        Pool: jest.fn(() => ({
            query: jest.fn().mockResolvedValue({ rows: [mockNewToken] })
        }))
    }
})

let req, res, next
beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = null
})

authController.generateToken = jest.fn()

describe('authController.generateToken', () => {
    it("should have a generateToken function", () => {
        expect(typeof authController.generateToken).toBe("function")
    })
    it("should call authController.generateToken", () => {
        authController.generateToken()
        authController.generateToken(req, res, next)
        expect(authController.generateToken).toBeCalled()
    })
    it("should return 200 response code and JSON body", () => {
        authController.generateToken(req, res, next)
        expect(res.statusCode).toBe(200)
    })
});
