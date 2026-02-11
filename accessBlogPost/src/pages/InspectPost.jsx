import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Header from '../components/Header';

function InspectPost(){
  // const [postData, setPostData] = useState(null);
  const {id}= useParams();
  const nav = useNavigate();

  useEffect(() => {
    try {
      const response = axios.get(`${import.meta.env.VITE_API_URL}/post/${id}`);
      setPostData(response.data);
    } catch (error) {
      console.log(error);
    }
  },[id]);

  const postData = {
    id: 1,
    title: "First Post",
    content: "This is the first post",
    author: "John Doe",
    comments: [
      {
        id: 1,
        username: "user1",
        content: "This is the first comment",
      },
      {
        id: 2,
        username: "user2",
        content: "This is the second comment",
      },
    ],
  }

  return(
    <div>
      <Header />
      <h1>{postData?.title}</h1>
      <p>Author: {postData?.author}</p>
      <h4>{postData?.content}</h4>
      <button type="button" onClick={()=>nav("/")}>Back</button>

      <div id="comments">
						{postData.comments.map((comment) => {
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
    </div>
  )
}

export default InspectPost;