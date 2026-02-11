import axios from "axios";
import { useState } from "react";

function SignUp() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			const response = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log("Server Response:", response.data);
			alert("Form submitted successfully!");
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("Failed to submit form.");
		}
	};

	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">
					Username: <br />{" "}
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						require='true'
					/>
				</label>
				<label htmlFor="email">
					Email: <br />{" "}
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						require='true'
					/>
				</label>
				<label htmlFor="password">
					Password: <br />
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						require='true'
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
      <a href="/">Back</a>
		</div>
	);
}

export default SignUp;
