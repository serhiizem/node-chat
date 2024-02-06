import {Controller} from "./interfaces/controller.interface";
import {Router} from "express";
import {register} from "prom-client";

export class MetricsController implements Controller {

    public readonly path = "metrics";
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", this.sendMetrics.bind(this));
    }

    private async sendMetrics(req, res) {
        res.setHeader("Content-Type", register.contentType);
        res.send(await register.metrics());
    }
}