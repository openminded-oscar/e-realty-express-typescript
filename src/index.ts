import express, { Request, Response } from "express";
import passport from "passport";
import { initAuth } from "./auth/init";
import { authUtils } from "./auth/auth";

initAuth.initGoogle();
initAuth.initJwt();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(passport.initialize());

app.get("/auth/google",
    passport.authenticate("google", {
        session: false,
        scope: ["email", "profile"]
    })
);

app.get("/auth/google/callback",
    (req, res, next) => {
        authUtils.generateUserToken(req, res);
        next();
    },
    passport.authenticate(
        "google",
        {
            session: false,
            successRedirect: "/protected",
            failureRedirect: "/auth/failure",
        }
    )
);

app.get("/auth/failure", (req, res) => {
    res.send("Something went wrong!");
});

app.get("/protected", authUtils.isLoggedIn, (req, res) => {
});

app.get("/logout", (req, res) => {
    req.logOut();
    res.send("Goodbye!");
});

app.listen(3000, () => {
    console.log("Listening port 3000");
});
