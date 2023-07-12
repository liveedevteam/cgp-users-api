import supertest from 'supertest';
import express from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { generateToken } from '../../../apps/auths/controllers';

dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.tz.setDefault("Asia/Bangkok")

describe('GET /api/auths/token/generate', () => {
    describe('should generate token', (done) => {
        let request
        beforeEach(() => {
            const app = express();
            app.get("/api/auths/token/generate", generateToken);
            request = supertest(app);
        });

        it("Response with a 401", async () => {
            const response = await request.get("/api/auths/token/generate")
            expect(response.statusCode).toBe(401)
        })

        it("Response with a 401", async () => {
            const response = await request.get("/api/auths/token/generate")
                .set('X-Api-Key', "xjioehq[qwe")
            expect(response.statusCode).toBe(401)
        })

        it("Response with a 200", async () => {
            const response = await request.get("/api/auths/token/generate")
                .set('X-Api-Key', process.env.X_API_KEY)
            // console.log(response)
            expect(response.statusCode).toBe(200)
        })
    });
});
