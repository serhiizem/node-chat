import * as client from "prom-client";

const register = new client.Registry();

export const messagesCounter = new client.Counter({
    name: "messages_counter",
    help: "Total number of messages received"
});

register.registerMetric(messagesCounter);

client.collectDefaultMetrics();