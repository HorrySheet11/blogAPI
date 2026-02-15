import { useState,useContext } from 'react';
import './LogIn.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

function LogIn({closeModal}){
  const {setUser,} = useContext(AuthContext);
  const nav = useNavigate();
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
		setLogInData({
			...logInData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(logInData);
		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/log-in`, logInData, {
				headers: {
					"Content-Type": "application/json",
				},
        timeout: 5000,
			});
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.accessToken);
			alert("Logged in successfully!");
      console.log("Server Response:", data);
      closeModal();
      nav("/");
		} catch (error) {
			console.error("Error logging in:", error);
			alert("Log in failed.");
		}
    return;
	};

  const goToSignUp = () => {
    nav("/sign-up")
  }
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
          <h4>Not a member? <button type='button' onClick={goToSignUp}>Sign Up</button></h4>
        </div>
      </form>
    </ >
  )
}

export default LogIn;