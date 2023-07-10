import fs from 'fs'
import path from 'path';
import express from 'express'

export default (app) => {
    const APP_DIR = path.join(__dirname, '../apps')
    const features = fs.readdirSync(APP_DIR).filter((file) => fs.statSync(`${APP_DIR}/${file}`).isDirectory());

    features.forEach((feature) => {
        const router = express.Router();
        const routes = require(`${APP_DIR}/${feature}/routes.js`);
        routes.setup(router);

        app.use(`/api/${feature}`, router);
    });
}