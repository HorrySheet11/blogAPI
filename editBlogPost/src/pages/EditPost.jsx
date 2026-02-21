import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../utils/api.js";

function editPost() {
	const [postData, setPostData] = useState({
    title: "",
    content: "",
    isPublished: false,
    blogId: null,
    id: 0,
  });
	const editorRef = useRef(null);
	const [searchParams, setSearchParams] = useSearchParams();

	const id = searchParams.get("id");

	useEffect(() => {
		console.log(id);
		const getPost = async (id) => {
			const response = await API.get(`/post/${id}`);
			console.log(response.data);
			setPostData(response.data);
		};
		try {
			getPost(id);
		} catch (error) {
			console.log(error);
		}
	},[]);

	const handleChange = (event) => {
		setPostData({
			...postData,
			[event.target.name]: event.target.value,
		});
	};

	const handleContentChange = () => {
		const editorContent = editorRef.current.getContent();
		setPostData({
			...postData,
			content: editorContent,
		});
	};

	const handleSubmit = () => {
    console.log(postData)
		try {
			const response = API.put(`/post/update/${id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			},  postData);
      alert(response.data.message);    
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<label>
				Title: <br />
				<input
					type="text"
					value={postData?.title}
					name="title"
					onChange={handleChange}
				/>
			</label>
			<br />
			<label htmlFor="editor">
				Content:
				<Editor
					id="editor"
					apiKey="fs1217l0slezwnzgyvtz6c5myup04fc87y1wrnvq079e8e5o"
					onInit={(evt, editor) => {
						editorRef.current = editor;
					}}
					onEditorChange={handleContentChange}
					value={postData?.content}
					init={{
						height: 500,
						menubar: false,
						toolbar:
							"undo redo | formatselect | " +
							"bold italic backcolor | alignleft aligncenter " +
							"alignright alignjustify | bullist numlist outdent indent | " +
							"removeformat | help",
						content_style:
							"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
					}}
				/>
			</label>
			<label htmlFor="published">
				Publish now?
				<input
					type="checkbox"
					name="published"
					id="published"
					onChange={() =>
						setPostData({ ...postData, isPublished: !postData.isPublished })
					}
				/>
			</label>
			<br />
			<button type="submit">Save</button>
		</form>
	);
}

export default editPost;
