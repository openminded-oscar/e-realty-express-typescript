import express, { Request, Response } from "express";
import JWT from "jsonwebtoken";
import passport from "passport";

export const authUtils = {
  isLoggedIn: (req: Request, res: Response, next: any) => {
    passport.authenticate("jwt", { session: false });

    req.user ? next() : res.sendStatus(401);
  },

  generateUserToken: (req: any, res: Response) => {
    const accessToken = JWT.sign(
      {
        id: req.sub,
      },
      // TODO_INSERT_KEY_HERE
      "TODO_INSERT_KEY_HERE"
    );
    // TODO store user token for user id
    res.cookie("token", accessToken);
  }
};
