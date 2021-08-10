import express, { Request, Response } from "express";
import passport from "passport";
import { initAuthStrategies } from "./auth/initStrategies";
import { authUtils } from "./auth/utils";
import cookieParser from "cookie-parser";

initAuthStrategies.initGoogle();
initAuthStrategies.initJwt();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/api/auth/google",
    passport.authenticate("google", {
        session: false,
        scope: ["email", "profile"]
    })
);

app.get("/api/auth/google/callback",
    passport.authenticate(
        "google",
        {
            session: false,
            failureRedirect: "/auth/failure",
        }
    ),
    (req, res: Response, next) => {
        const token: string = authUtils.generateUserToken(req, res);
        res.cookie("jwt", token, {httpOnly:true, secure:true});
        res.redirect("/api/protected?token="+token);
        // FOR Angular TODO
        // 1 embed token inside of html with template engine like Mustache
        // OR 2 pass it by redirect with header
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
