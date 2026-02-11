import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Login from "../components/LogIn";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
	// const [user, setUser] = useState(null);
	// const [posts, setPosts] = useState([]);
	// const [comments, setComments] = useState([]);
	const user = { username: "Bubba" };
	// const user = null;
	const dialogRef = useRef(null);
  const nav = useNavigate();

	const posts = [
		{
			id: 1,
			title: "First Post",
			user: "user1",
			content: "This is the first post",
		},
		{
			id: 2,
			title: "Second Post",
			user: "user2",
			content: "This is the second post",
		},
	];

	const comments = [
		{
			id: 1,
			content: "This is the first comment",
		},
		{
			id: 2,
			content: "This is the second comment",
		},
	];
	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_URL)
			.then((res) => {
				setUser(res.user);
				setPosts(res.posts);
				setComments(res.comments);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const openModal = () => dialogRef.current?.showModal();
	const closeModal = () => dialogRef.current?.close();

  const goToPost = (id) => {
    return () => {
      nav(`/post/${id}`);
    };
  };
	return (
		<div id="home">
			<h1>Horry Blog</h1>
			<dialog ref={dialogRef}>
				<Login closeModal={closeModal} />
			</dialog>
			{user ? (
				<>
					<h2>Welcome {user.username}</h2>
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
					<div id="comments">
						{comments.map((comment) => {
							return (
								<a href={`/comments/${comment.id}`} key={comment.id}>
									<div>
										<h2>{comment.username}</h2>
										<p>{comment.content}</p>
									</div>
								</a>
							);
						})}
					</div>
				</>
			) : (
				<>
					<h2>Not logged in</h2>
					<button onClick={openModal} type="button">
						Log In
					</button>
				</>
			)}
		</div>
	);
}

export default Home;
