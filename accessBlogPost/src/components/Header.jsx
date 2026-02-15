import { useNavigate } from "react-router-dom";
import {useRef, useContext} from 'react';
import './Header.css';
import { AuthContext } from "../context/AuthContext.jsx";
import axios from 'axios';
import Login from "../components/LogIn";


function Header() {
  const { user, loading,setUser } = useContext(AuthContext);
	const nav = useNavigate();
	const dialogRef = useRef(null);
	

	const logout = async () => {
		try {
			localStorage.removeItem("token");
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/log-out`);
			setUser(null);
			nav("/user/log-in");
			return;
		} catch (error) {
			console.log(error);
		}
	};

	const openModal = () => dialogRef.current?.showModal();
	const closeModal = () => dialogRef.current?.close();


	return (
		<>
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
								<button type="button" onClick={openModal}>Log in</button>
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
			<dialog ref={dialogRef}>
				<Login closeModal={closeModal} />
			</dialog>
		</>
	);
}

export default Header;
