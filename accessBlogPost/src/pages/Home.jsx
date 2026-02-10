import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Login from "../components/LogIn";

function Home() {
	// const [user, setUser] = useState(null);
	// const [posts, setPosts] = useState([]);
	// const [comments, setComments] = useState([]);
	// const user = {username: "Bubba"}
  const dialogRef = useRef(null);
	const user = null;
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
			.get("/")
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

  return (
		<>
			{user ? (
				<h1>Welcome {user.username}</h1>
			) : (
				<button onClick={openModal} type="button">
					Log In
				</button>
			)}
			<dialog ref={dialogRef}>
				<Login closeModal={closeModal}/>
			</dialog>
			<div id="blog">
				{posts.map((post) => {
					return (
						<a href={`/posts/${post.id}`} key={post.id}>
							<div>
								<h2>{post.title}</h2>
								<h3>By: {post.user}</h3>
								<p>{post.content}</p>
							</div>
						</a>
					);
				})}
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
	);
}

export default Home;
