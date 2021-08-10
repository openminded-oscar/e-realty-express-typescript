import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import { googleConfig } from "../config/googleConfig";
import { jwt } from "../config/jwt";

passport.serializeUser(function (user, done) {
  // TODO add saving
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  // TODO add retrieving
  done(null, { id: 1, displayName: "DummyUser" });
});

export const initAuthStrategies = {
  initJwt: () => {
    const opts: StrategyOptions = {
      jwtFromRequest: (req) => {
        let token = null;
        if (req.cookies) {
          token = req.cookies.jwt;
        }
        return token;
      },
      secretOrKey: jwt.key,
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
          // TODO fix
          return done(null, {name: 'iv', surname: 'lol'});
      })
    );
  },

  initGoogle: () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: googleConfig.clientID,
          clientSecret: googleConfig.clientSecret,
          callbackURL: "http://localhost:3000/api/auth/google/callback",
          passReqToCallback: true
        },
        (request: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
          // TODO check for user by profileId and create if missing
          console.log("After use");
          request.accessField = accessToken;
          request.refreshField = refreshToken;
          return done(null, profile);
        }
      )
    );
  },
};
