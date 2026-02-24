import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext.jsx";
import API from "../utils/api.js";
import "./InspectPost.css";

function InspectPost() {
	const [postData, setPostData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [decoded, setDecoded] = useState({});
	const [edit, setEdit] = useState(false);
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const nav = useNavigate();

	useEffect(() => {
		async function getPost(id) {
			const response = await API.get(`/post/${id}`);
			setPostData(response.data);
		}
		try {
			localStorage.getItem("token") &&
				setDecoded(jwtDecode(localStorage.getItem("token")));
			getPost(id);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}, [id]);

	useEffect(() => {
		setEdit(user?.id === postData?.blog?.authorId);
	}, [user, postData]);

	return (
		<div>
			<Header />
			{loading === true ? (
				<h2 id="loading">Fetching posts...</h2>
			) : (
				<>
					<h1>{postData?.title}</h1>

					{edit === true ? (
						<a
							href={`${import.meta.env.VITE_EDIT_POST_URL}/post/edit/?tkn=${decoded?.jti}&id=${id}`}
						>
							<button type="button">Edit</button>
						</a>
					) : (
						<p>Author: {postData?.blog.authorName}</p>
					)}

					<h4>{postData?.content}</h4>
					<button type="button" onClick={() => nav("/")}>
						Back
					</button>

					<div id="comments">
						{postData?.comments?.map((comment) => {
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
			)}
		</div>
	);
}

export default InspectPost;
