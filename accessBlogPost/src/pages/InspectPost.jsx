import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

function InspectPost(){
  const [postData, setPostData] = useState(null);
  const {id}= useParams();
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/post/${id}`).then((response) => {
      setPostData(response.data);
    });
  })

  return(
    <div>
      <h1>Inspect Post</h1>
      <h1>Post ID: {id}</h1>
      <button type="button" onClick={()=>nav("/")}>Back</button>
    </div>
  )
}

export default InspectPost;