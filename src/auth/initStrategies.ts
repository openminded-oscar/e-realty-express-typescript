import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import { googleConfig } from "../config/googleConfig";
import { jwt } from "../config/jwt";

export const initAuthStrategies = {
  initJwt: () => {
    const opts: StrategyOptions = {
      //  TODO use header instead
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
          // TODO check for user by profileId and create if missing,
          // save token and state initially passed from frontend also here
          console.log("After use");
          request.accessField = accessToken;
          request.refreshField = refreshToken;
          return done(null, profile);
        }
      )
    );
  },
};
