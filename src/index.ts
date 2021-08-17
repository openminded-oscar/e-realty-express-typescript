import express  from "express";
import passport from "passport";
import cors from "cors";
import { initAuthStrategies } from "./auth/initStrategies";
import cookieParser from "cookie-parser";
import http from 'http';
import { Server, Socket } from 'socket.io';
import { apiRouter } from "./routes";
import mongoose from 'mongoose';

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

// Init mongoose
mongoose.connect("mongodb://localhost:27017/realperfect", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    startServer();
    startSocketIOServer();
});

// Init SocketIOServer function
const startSocketIOServer = () => {
    const ioServer = http.createServer(app);
    const io = new Server(ioServer);
    io.on('connection', client => {
        client.on('event', data => {
        });
        client.on('disconnect', () => {
        });
    });
    ioServer.listen(8081);
}

// Init Express.js server function
const startServer = () => {
    app.listen(3000, () => {
        console.log("Listening port 3000");
    });
}

