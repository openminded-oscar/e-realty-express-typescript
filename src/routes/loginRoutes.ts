import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hi there");
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.send(email + password);
});

export { router };
