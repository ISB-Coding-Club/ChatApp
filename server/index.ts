import * as vite from "vite";
import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { handleRequest } from "./server";
import { randomUUID } from "crypto";

const main = async () => {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    const viteServer = await vite.createServer({
        server: { middlewareMode: true },
        appType: "spa",
    });

    app.use(viteServer.middlewares);
    app.get("*", (req, res, next) => handleRequest(req, res, next, viteServer));

    io.on("connection", (socket) => {
        console.log(`Socket connected with ID: ${socket.id}`);

        socket.on("send_message", (data) => {
            const newData = Object.assign(data, {
                id: randomUUID(),
            });
            
            io.emit("message", newData);
            console.log(newData);
        });
    });

    server.listen(3000, () => {
        console.log(`Listening on port 3000!`);
    });
};

main();
