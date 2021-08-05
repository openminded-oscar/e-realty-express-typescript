import express, { Request, Response } from "express";
import JWT from "jsonwebtoken";

export const authUtils = {
  isLoggedIn: (req: Request, res: Response, next: any) => {
    req.user ? next() : res.sendStatus(401);
  },
  generateUserToken: (req: Request, res: Response) => {
    const accessToken = JWT.sign(
      {
        id: req.user.id,
      },
      // TODO_INSERT_KEY_HERE
      "TODO_INSERT_KEY_HERE"
    );
    // TODO store user token for user id

    res.send({ token: accessToken });
  },
};
