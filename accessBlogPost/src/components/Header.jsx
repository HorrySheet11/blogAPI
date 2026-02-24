import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { jwtDecode } from "jwt-decode";
import Login from "../components/LogIn";
import { AuthContext } from "../context/AuthContext.jsx";
import API from "../utils/api.js";

function Header() {
	const { user, setUser, loading, setLoading } = useContext(AuthContext);
	const nav = useNavigate();
	const dialogRef = useRef(null);
	const [decoded, setDecoded] = useState({});

	//* get user if existing token
	useEffect(() => {
		if (!user && localStorage.getItem("token")) {
			setDecoded(jwtDecode(localStorage.getItem("token")));
			async function getUser(id) {
				setLoading(true);
				try {
					const response = await API.get(`/user/${id}`);
					setUser(response.data);
				} catch (error) {
					console.log(error);
				}
				return;
			}
			getUser(decoded.sub);
			setLoading(false);
		}
	}, [ decoded, setLoading, setUser, user]);

	// useEffect(() => {
	// 	if(!user){
	// 		window.location.href = `${import.meta.env.VITE_ACCESS_BLOG}`;
	// 	}
	// }, [user]);

	const logout = async () => {
		try {
			console.log(user);
			const response = await API.post(`/user/log-out`);
			alert(response.data.message);
			nav("/");
			localStorage.removeItem("token");
			setUser(null);
			return;
		} catch (error) {
			console.log(error);
		}
	};

	const openModal = () => dialogRef.current?.showModal();
	const closeModal = () => dialogRef.current?.close();

	//* --go to add/edit post--
	//* get token jti and pass to url
	//* on add/edit post get jti and get token based on jti
	//* if no then go back to home
	async function goToAddPost() {
		const data = { jti: decoded.jti ,
			token: localStorage.getItem("token"), 
			};
			console.log(decoded)
		try {
			const response = await API.post(`/user/managePost`, data, {
				headers: { "Content-Type": "application/json" },
			});
			window.location = `${import.meta.env.VITE_EDIT_POST_URL}/post/add/?tkn=${decoded.jti}`;
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className="header">
				<h2>Horry Blog</h2>
				{user && <h3>Welcome {user.name}</h3>}
				{loading && <h3>Loading...</h3>}
				<ul>
					<li>
						<button type="button" onClick={() => nav("/")}>
							Home
						</button>
					</li>
					{!user ? (
						<>
							<li>
								<button type="button" onClick={openModal}>
									Log in
								</button>
							</li>
							<li>
								<button type="button" onClick={() => nav("/user/sign-up")}>
									Sign up
								</button>
							</li>
						</>
					) : (
						<>
							<li>
								<button type="button" onClick={goToAddPost}>
									New Post
								</button>
							</li>
							<li>
								<button type="button" onClick={logout}>
									Log out
								</button>
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
