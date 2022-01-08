import {Application, json, urlencoded} from 'express';
import BoardRouter from './board';
import * as env from 'dotenv';
import * as bodyParser from "body-parser";

env.config();

export default class Routes {

    private readonly apiVersion: string;

    constructor(app: Application) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(json());
        app.use('/board', BoardRouter);
    }
}