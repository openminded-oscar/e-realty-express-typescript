import express, { Response } from "express";
import passport from "passport";
import cors from "cors";
import { initAuthStrategies } from "./auth/initStrategies";
import cookieParser from "cookie-parser";
import http from 'http';
import { Server, Socket } from 'socket.io';
import { apiRouter } from "./routes";

initAuthStrategies.initGoogle();
initAuthStrategies.initJwt();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

app.use('/api', apiRouter);
app.use(express.static(__dirname + '/public'));
app.use('/*', function(req, res){
    res.sendfile(__dirname + '/public/index.html');
});

// Init server here
const ioServer = http.createServer(app);
const io = new Server(ioServer);
io.on('connection', client => {
    client.on('event', data => {});
    client.on('disconnect', () => {});
});
ioServer.listen(8081);

app.listen(3000, () => {
    console.log("Listening port 3000");
});
