import express, { Response } from "express";
import passport from "passport";
import cors from "cors";
import { initAuthStrategies } from "./auth/initStrategies";
import { authUtils } from "./auth/utils";
import cookieParser from "cookie-parser";

initAuthStrategies.initGoogle();
initAuthStrategies.initJwt();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

app.get("/api/auth/google", (req,res,next) => {
        passport.authenticate("google", {
            session: false,
            scope: ["email", "profile"],
// TODO add 'state' if necessary here
            state: ""
        })(req, res, next);
    }
);

app.get("/api/auth/google/callback",
    passport.authenticate(
        "google",
        {
            session: false,
            failureRedirect: "/auth/failure"
        }
    ),
    (req, res: Response, next) => {
        const token: string = authUtils.generateUserToken(req, res);
        // This is html wrapper to be opened in separate window
        let responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            token: token
        }));
        res.status(200).send(responseHTML);
    },
);

app.get("/api/auth/failure", (req, res) => {
    res.send("Something went wrong!");
});

app.get("/api/protected", passport.authenticate("jwt", { session: false }), authUtils.isLoggedIn, (req, res) => {
    res.send("SUCCESS!!!");
});

app.get("/api/logout", (req, res) => {
    req.logOut();
    res.send("Goodbye!");
});

app.listen(3000, () => {
    console.log("Listening port 3000");
});
