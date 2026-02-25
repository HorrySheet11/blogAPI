import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
	addTokenInfo,
	blacklistToken,
	validateTokenInfo,
} from "../models/Token.js";
import {
	createUser,
	findBlogById,
	findUserByEmail,
	findUserById,
	saveRefreshToken,
} from "../models/User.js";
import { generateTokenPair, verifyToken } from "../utils/jwt.js";
import { enhanceConsoleLog } from "../utils/log.js";

enhanceConsoleLog();

export function login(req, res, next) {
	passport.authenticate(
		"local",
		{ session: false },
		async (err, user, info) => {
			if (err) return res.status(500).json({ error: "Authentication error" });
			if (!user) {
				return res
					.status(401)
					.json({ error: info?.message || "Invalid credentials" });
			}
			try {
				const tokens = generateTokenPair(user);
				await saveRefreshToken(user.id, tokens.refreshToken);
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
export async function logout(req, res) {
	// passport.authenticate("jwt", { session: false })
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(400).json({ message: "No token provided" });
		}
		const token = authHeader.split(" ")[1];
		const decoded = jwt.decode(token, process.env.JWT_SECRET);
		//* Add token's jti to blacklist
		await blacklistToken(decoded, decoded.sub);
		res.status(200).json({ message: "Logged out successfully" });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Invalid token" });
	}
	res.end();
}

export async function signUp(req, res) {
	try {
		const { email, password, name } = req.body;

		if (!email || !password || !name) {
			return res.status(400).json({ error: "All fields are required" });
		}

		if (password.length < 8) {
			return res
				.status(400)
				.json({ error: "Password must be at least 8 characters" });
		}

		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			return res.json({ error: "Email already registered" }).status(409);
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await createUser({
			email: email.toLowerCase(),
			password: hashedPassword,
			name,
			blog: {
				create: { authorName: name },
			},
		});

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

export async function refreshToken(req, res) {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(400).json({ error: "Refresh token required" });
	}

	try {
		const payload = verifyToken(refreshToken);

		if (!payload || payload.type !== "refresh") {
			return res.status(401).json({ error: "Invalid refresh token" });
		}

		const user = await findUserById(payload.sub);

		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}

		const tokens = generateTokenPair(user);
		await saveRefreshToken(user.id, tokens.refreshToken);

		res.json(tokens);
	} catch (error) {
		res.status(500).json({ error: "Token refresh failed" });
	}
}

export async function getUser(req, res) {
	try {
		const userId = req.params.id;
		const user = await findUserById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.json(user);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve user" });
	}
}

export async function getBlogAuthor(req, res) {
	try {
		const blogId = req.params.id;
		const blog = await findBlogById(blogId);
		if (!blog) {
			return res.status(404).json({ error: "Blog not found" });
		}
		return res.json(blog);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve blog" });
	}
}

export async function addTokenData(req, res) {
	try {
		const token = req.body.token;
		const jti = req.body.jti;
		const addToken = await addTokenInfo(token, jti);
		if (!addToken) {
			return res.status(404).json({ error: "Token not found" });
		}
		return res.json(addToken);
	} catch (err) {
		res.status(500).json({ error: "Error adding token info" });
	}
}

export async function validateToken(req, res) {
	try {
		const {jti} = req.params;
		const checkToken = await validateTokenInfo(jti);
		return res.json(checkToken);
	} catch (err) {
		res.status(500).json({ error: "Error validating token info" });
	}
}
