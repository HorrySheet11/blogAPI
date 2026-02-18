import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import API from "../utils/api.js";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Home() {
	const { user } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);
	const nav = useNavigate();

	useEffect(() => {
		// try {
		async function getAllPosts() {
			const response = await API.get(`/post`);
			console.log(response.data);
			setPosts(response.data);
		}
		getAllPosts();
		// } catch (error) {
		// 	console.log(error);
		// }
	}, []);

	const goToPost = (id) => {
		return () => {
			nav(`/post/${id}`);
		};
	};
	return (
		<div id="home">
			<Header />
			{!user && <h2>Not logged in</h2>}
			<div id="blog">
				<ul>
					{/* FIXME: cannot read length */}
					{!posts ? (
						<h3>No posts</h3>
					) : (
						posts?.map((post) => {
							return (
								<li key={post.id} className="post">
									<button type="button" onClick={goToPost(post.id)}>
										<h2>{post.title}</h2>
										<h4>By: {post.user}</h4>
										<p>{post.content}</p>
									</button>
								</li>
							);
						})
					)}
				</ul>
			</div>
		</div>
	);
}

export default Home;
