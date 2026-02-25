/** biome-ignore-all lint/correctness/useHookAtTopLevel: <explanation> */
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../utils/api.js";

function editPost() {
	const [postData, setPostData] = useState(null);
	const editorRef = useRef(null);
	const [searchParams] = useSearchParams();

	const id = searchParams.get("id");
	const jti = searchParams.get("tkn");

	//* validate jti to access edit post
	useEffect(() => {
		if (!jti) {
			window.location.href = `${import.meta.env.VITE_ACCESS_BLOG}`;
		}
		async function validateJTI(jti) {
			try {
				const response = await API.get(`/user/validate/${jti}`);
				if (!response.data) {
					alert("Invalid token");
					window.location.href = `${import.meta.env.VITE_ACCESS_BLOG}`;
				}
				localStorage.setItem("token", response.data.token);

			} catch (error) {
				console.log(error);
			}
		}
		validateJTI(jti);
	}, [jti]);

	useEffect(() => {
		console.log(id);
		async function getPost(id) {
			const response = await API.get(`/post/${id}`);
			setPostData(response.data);
		}
		try {
			getPost(id);
		} catch (error) {
			console.log(error);
		}
	}, [id]);

	useEffect(() => {
		console.log(postData);
	}, [postData]);

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
		console.log(postData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(postData);
		try {
			const response = await API.put(
				`/post/update/${id}`,
				{ postData },
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			alert(response.data.message);
		} catch (error) {
			console.log(error);
			return;
		}
		window.location.href = `${import.meta.env.VITE_ACCESS_BLOG}`;
		return;
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
					checked={postData?.isPublished}
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
