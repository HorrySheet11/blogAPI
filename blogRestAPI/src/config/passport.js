import bcrypt from "bcryptjs";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import * as token from "../models/Token.js";
import * as query from "../models/User.js";

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, done) => {
			try {
				const user = await query.findUserByEmail(email);
				if (!user) {
					return done(null, false, { message: "Invalid credentials" });
				}

				const isValidPassword = await bcrypt.compare(password, user.password);

				if (!isValidPassword) {
					return done(null, false, { message: "Invalid password" });
				}

				const { password: _, ...userWithoutPassword } = user;
				return done(null, userWithoutPassword);
			} catch (error) {
				console.log("ERROR!");
				return done(error);
			}
		},
	),
);

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
			algorithms: ["HS256"],
		},
		async (payload, done) => {
			try {
				if (Date.now() >= payload.exp * 1000) {
					return done(null, false, { message: "Token expired" });
				}
				// Check if token is blacklisted
				const result = await token.findTokenByJti(payload.jti);
				if (result) {
					return done(null, false, { message: "Token is blacklisted" });
				}
				const user = await query.findUserById(payload.sub);
				if (!user) {
					return done(null, false);
				}
				return done(null, user);
			} catch (error) {
				return done(error, false);
			}
		},
	),
);

export default passport;
