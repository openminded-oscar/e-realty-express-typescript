import { Response, Router } from 'express';
import passport from "passport";
import { authUtils } from "./auth/utils";
import  { apiRouter as realtyRouter } from "./realty/realty.routes";

export const apiRouter = Router();

apiRouter.use('/realty-objects', realtyRouter);

apiRouter.get("/auth/google", (req, res, next) => {
        passport.authenticate("google", {
            session: false,
            scope: ["email", "profile"],
// TODO add 'state' if necessary here
            state: ""
        })(req, res, next);
    }
);

apiRouter.get("/auth/google/callback",
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

apiRouter.get("/auth/failure", (req, res) => {
    res.send("Something went wrong!");
});

apiRouter.get("/protected", passport.authenticate("jwt", { session: false }), authUtils.isLoggedIn, (req, res) => {
    res.send("SUCCESS!!!");
});

apiRouter.get("/logout", (req, res) => {
    req.logOut();
    res.send("Goodbye!");
});
