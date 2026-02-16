import API from '../utils/api.js';
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Header from '../components/Header';

function InspectPost(){
  const [postData, setPostData] = useState(null);
  const {id}= useParams();
  const nav = useNavigate();

  useEffect(async () => {
    try {
      const response = await API.get(`/post/${id}`);
      setPostData(response.data);
      return;
    } catch (error) {
      console.log(error);
    }
  },[id]);


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