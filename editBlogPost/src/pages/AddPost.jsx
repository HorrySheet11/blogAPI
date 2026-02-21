import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import API from "../utils/api.js";

function addPost() {
	const [postData, setPostData] = useState({
		title: "",
		content: "Enter post content here.",
		isPublished: false,
		blogId: 1,
	});
	const editorRef = useRef(null);

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await API.post(`/post/add`, { postData }, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response);
			alert("Post added successfully");
		} catch (error) {
			console.log(error);
			return;
		}
		window.location.href = `${import.meta.env.VITE_ACCESS_BLOG}`;
		return;
	};


	return (
		<>
			<h1>Add New Post</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Title: <br />
					<input
						type="text"
						value={postData.title}
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
						value={postData.content}
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
				<label htmlFor="published">Publish now? 
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
		</>
	);
}

export default addPost;
