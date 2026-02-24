import API from '../utils/api.js';
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState,useContext } from 'react';
import './LogIn.css'

function LogIn({closeModal}){
  const {setLoading, setUser} = useContext(AuthContext);
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
    setLoading(true);
    e.preventDefault();
    // console.log(logInData);
		try {
			const response = await API.post(`/user/log-in`, logInData, {
				headers: {
					"Content-Type": "application/json",
				},
        timeout: 5000,
			});
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.accessToken);
			alert("Logged in successfully!");
      // console.log("Server Response:", data);
      closeModal();
      nav("/");
		} catch (error) {
			console.error("Error logging in:", error);
			alert("Log in failed.");
		}
    setLoading(false)
    return;
	};

  const goToSignUp = () => {
    nav("/user/sign-up")
  }
  return(
    <>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>Email: <br /><input type="email" name="email" value={logInData.email}
						onChange={(e) => handleChange(e)}
						require='true'/></label>
        <label>Password: <br /><input type="password" name="password" value={logInData.password}
						onChange={(e) => handleChange(e)}
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