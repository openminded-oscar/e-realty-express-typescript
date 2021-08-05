import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

export const initAuth = {
  initGoogle: () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: "",
          clientSecret: "",
          callbackURL: "",
        },
        // verify tokens function
        (accessToken: string, refreshToken: string, profile: any, done) => {
          console.log("After use");
        }
      )
    );
  },
};
