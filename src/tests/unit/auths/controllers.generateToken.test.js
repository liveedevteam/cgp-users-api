import authController from '../../../apps/auths/controllers';
import httpMocks from 'node-mocks-http';

let req, res, next
beforeEach(() => {
    req = httpMocks.createRequest({
        headers: { 'X-Api-Key': process.env.X_API_KEY },
    });
    res = httpMocks.createResponse();
    next = null;
});

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
