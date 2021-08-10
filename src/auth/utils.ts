import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { jwt } from "../config/jwt";

export const authUtils = {
  isLoggedIn: (req: Request, res: Response, next: any) => {
    console.log(req.user);
    req.user ? next() : res.sendStatus(401);
  },

  generateUserToken: (req: any, res: Response): string => {
    const accessToken = JWT.sign(
      {
        googleId: req.user.sub,
      },
      jwt.key
    );
    // TODO save refresh token for userId here
    // TODO store user token for user id
    return accessToken;
  }
};
