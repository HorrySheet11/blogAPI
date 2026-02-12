import bcrypt from "bcryptjs";
import passport from "passport";
import {createUser, findUserByEmail, saveRefreshToken } from "../models/User.js";
import { generateTokenPair, verifyToken } from "../utils/jwt.js";

export function loginPost(req, res, next) {
	passport.authenticate(
		"local",
		{ session: false },
		async (err, user, info) => {
			if (err) {
				return res.status(500).json({ error: "Authentication error" });
			}

			if (!user) {
				return res
					.status(401)
					.json({ error: info?.message || "Invalid credentials" });
			}

			try {
				const tokens = generateTokenPair(user);
				await saveRefreshToken(user.id, tokens.refreshToken,);

				res.json({
					message: "Login successful",
					user: { id: user.id, email: user.email, name: user.name },
					...tokens,
				});
			} catch (error) {
				res.status(500).json({ error: "Token generation failed" });
			}
		},
	)(req, res, next);
}

export function logout(req, res) {
	res.render("logout.ejs");
}

export async function signUpPost(req, res) {
	try {
		const { email, password, name } = req.body;

		// Validate input
		if (!email || !password || !name) {
			return res.status(400).json({ error: "All fields are required" });
		}

		if (password.length < 8) {
			return res
				.status(400)
				.json({ error: "Password must be at least 8 characters" });
		}

		// Check if user exists
		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			return res.status(409).json({ error: "Email already registered" });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create user
		const user = await createUser({
			email: email.toLowerCase(),
			password: hashedPassword,
			name,
		});

		// Generate tokens
		const tokens = generateTokenPair(user);
		await saveRefreshToken(user.id, tokens.refreshToken);

		res.status(201).json({
			message: "Registration successful",
			user: { id: user.id, email: user.email, name: user.name },
			...tokens,
		});
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({ error: "Registration failed" });
	}
}
