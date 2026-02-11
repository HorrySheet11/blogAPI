import { useState } from 'react';
import './LogIn.css'

function LogIn({closeModal}){
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
		setLogInData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			const response = axios.post(`${import.meta.env.VITE_API_URL}/log-in`, formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log("Server Response:", response.data);
			alert("Logged in successfully!");
		} catch (error) {
			console.error("Error logging in:", error);
			alert("Log in failed.");
		}
    closeModal();
	};

  return(
    <>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>Email: <br /><input type="email" name="email" value={logInData.email}
						onChange={handleChange}
						require='true'/></label>
        <label>Password: <br /><input type="password" name="password" value={logInData.password}
						onChange={handleChange}
						require='true' /></label>
        <div>
          <button type="submit">Log In</button>
          <button type="button" onClick={() => closeModal()}>Close</button>
          <h4>Not a member? <a href="/sign-up">Sign Up</a></h4>
        </div>
      </form>
    </ >
  )
}

export default LogIn;