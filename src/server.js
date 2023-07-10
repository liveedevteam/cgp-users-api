import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import timeout from "connect-timeout";
import helmet from "helmet";
import compression from "compression";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { setUpRoute } from "./libs";
import { checkDbConnection } from "./libs/database";

dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.tz.setDefault("Asia/Bangkok")

export const serverSetup = async () => {
    const app = express()
    const PORT = process.env.PORT

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(helmet());
    app.disable("x-powered-by");
    app.use(timeout("60s"));
    app.use((req, res, next) => { if (!req.timedout) next() });

    await checkDbConnection()

    app.get("/healthz", (req, res) => res.send("Healthz Check"))
    app.get("/", (req, res) => res.send("Home API V1"))

    setUpRoute(app)

    app.listen(PORT, () => console.log(`App Listening PORT: ${PORT}`))
}