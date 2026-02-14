import { useNavigate } from "react-router-dom";
import {useState, useContext} from 'react';
import './Header.css';
import { AuthContext } from "../context/AuthContext.jsx";
import axios from 'axios';

function Header() {
  const { user, loading,setUser } = useContext(AuthContext);
	const nav = useNavigate();

	const logout = () => {
		localStorage.removeItem("token");
		const response = axios.get(`${import.meta.env.VITE_API_URL}/user/log-out`);
		setUser(null);
		nav("/user/log-in");
	};

	return (
		<div className="header">
			<h2>Horry Blog</h2>
			{user && <h3>Welcome {user.username}</h3>}
			<ul>
				<li>
					<button type="button" onClick={()=>nav('/')}>Home</button>
				</li>
				{!user ? (
					<>
						<li>
							<button type="button" onClick={()=>nav('/user/log-in')}>Log in</button>
						</li>
						<li>
							<button type="button" onClick={()=>nav('/user/sign-up')}>Sign up</button>
						</li>
					</>
        ) : (
          <>
            <li>
              <button type="button" onClick={()=>nav('/post/new-post')}>New Post</button>
            </li>
            <li>
              <button type="button" onClick={logout}>Log out</button>
            </li>
          </>
        )}
			</ul>
		</div>
	);
}

export default Header;
