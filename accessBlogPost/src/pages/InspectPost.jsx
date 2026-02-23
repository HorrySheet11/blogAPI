import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext.jsx";
import API from "../utils/api.js";
import "./InspectPost.css";

function InspectPost() {
	const [postData, setPostData] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const nav = useNavigate();
	const { user } = useContext(AuthContext);
	const [edit, setEdit] = useState(false)

	useEffect(() => {
		async function getPost(id) {
			const response = await API.get(`/post/${id}`);
			setPostData(response.data);
		}
		try {
			getPost(id);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}, [id]);


	//TODO: show edit button if user.sub == postdata.blog.authorid
	useEffect(()=>{
		setEdit(user?.id  === postData?.blog?.authorId);
	},[user,postData])

	return (
		<div>
			<Header />
			{loading === true ? (
				<h2 id="loading">Fetching posts...</h2>
			) : (
				<>
					<h1>{postData?.title}</h1>

					{edit === true ? (
						<button type="button">Edit</button>
					): <p>Author: {postData?.blog.authorName}</p>}

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
