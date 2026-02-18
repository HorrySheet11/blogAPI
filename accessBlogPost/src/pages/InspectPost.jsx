import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import API from "../utils/api.js";
import "./InspectPost.css";

function InspectPost() {
	const [postData, setPostData] = useState(null);
  const [postAuthor, setPostAuthor] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const nav = useNavigate();
  const blogId = postData?.blogId;

	useEffect(() => {
    async function getAuthorFromBlog(id){
      const response = await API.get(`/user/blog/${id}`);
        console.log(response.data);
        setPostAuthor(response.data.author);
    }
		async function getPost(id) {
			const response = await API.get(`/post/${id}`);
			console.log(response.data);
			setPostData(response.data);
		}
		try {
			getPost(id);
      getAuthorFromBlog(blogId);
		} catch (error) {
			console.log(error);
		}
    setLoading(false);
	}, [id,blogId]);

	return (
		<div>
			<Header />
			{loading === true ? (
				<h2 id="loading">Fetching posts...</h2>
			) : (
				<>
					<h1>{postData?.title}</h1>
					<p>Author: {postAuthor?.name}</p>
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
