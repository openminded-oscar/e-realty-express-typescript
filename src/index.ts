import express, { Request, Response } from "express";
import { router } from "./routes/loginRoutes";
import passport from "passport";
import { initAuth } from "./auth/init";
import { authUtils } from "./auth/auth";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
initAuth.initGoogle();

app.get("/auth/google", (req, res) => {
  passport.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
  });
});

app.get("/google/callback", (req, res) => {
  passport.authenticate(
    "google",
    {
      session: false,
      successRedirect: "/protected",
      failureRedirect: "/auth/failure",
    },
    authUtils.generateUserToken
  );
});

app.get("/auth/failure", (req, res) => {
  res.send("Something went wrong!");
});

app.get("/protected", authUtils.isLoggedIn, (req, res) => {});

app.listen(3000, () => {
  console.log("Listening port 3000");
});
