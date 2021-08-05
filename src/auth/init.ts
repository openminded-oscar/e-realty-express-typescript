import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";

passport.serializeUser(function (user, done) {
  // TODO add saving
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  // TODO add retrieving
  done(null, { id: 1, displayName: "DummyUser" });
});

export const initAuth = {
  initJwt: () => {
    const opts: StrategyOptions = {
      jwtFromRequest: (req) => {
        // TODO fix - read from bearer
        let token = null;
        if (req && req.cookies) {
          token = req.cookies["jwt"];
        }
        return token;
      },
      // TODO fix key
      secretOrKey: "secretOrKey",
    };

    passport.use(
      new JwtStrategy(opts, function (jwt_payload, done) {
        console.log("JWT BASED AUTH GETTING CALLED"); // called everytime a protected URL is being served
        // if (CheckUser(jwt_payload.data)) {
        //     return done(null, jwt_payload.data)
        // } else {
        //     // user account doesnt exists in the DATA
        //     return done(null, false)
        // }
      })
    );
  },

  initGoogle: () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: "",
          clientSecret: "",
          callbackURL: "http://localhost:3000/auth/google/callback",
          passReqToCallback: true
        },
        (request: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
          // TODO check for user by profileId and create if missingƒ
          console.log("After use");
          return done(null, profile);
        }
      )
    );
  },
};
