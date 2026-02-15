import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import "./Home.css";
import { useNavigate, } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Home() {
  const { user, loading } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);
  const nav = useNavigate();

	useEffect(() => {
		// try {
			const response = axios.get(`${import.meta.env.VITE_API_URL}/post`);
			setPosts(response.data);
		// } catch (error) {
		// 	console.log(error);
		// }
	},[])


  const goToPost = (id) => {
    return () => {
      nav(`/post/${id}`);
    };
  };
	return (
    <div id="home">
      <Header />
			{user ? (
					<div id="blog">
						<ul>
							{posts.map((post) => {
								return (
									<li key={post.id} className="post">
										<button type='button' onClick={goToPost(post.id)}>
												<h2>{post.title}</h2>
												<h4>By: {post.user}</h4>
												<p>{post.content}</p>
										</button>
									</li>
								);
							})}
						</ul>
					</div>
			) : (
				<h2>Not logged in</h2>
			)}
		</div>
	);
}

export default Home;
