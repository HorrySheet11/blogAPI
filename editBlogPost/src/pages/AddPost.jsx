import { Editor } from "@tinymce/tinymce-react";
import { useState, useRef } from "react";
import API from '../utils/api.js';

function addPost() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const editorRef = useRef(null);

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleSubmit = (event) => {
		const editorContent = editorRef.current.getContent();
		try {
			const response = API.post(`/post/add`,
				, { title, editorContent });
			console.log(response);
		} catch (error) {
			console.log(error)
		}
		setContent(event.target.value);
	};

	const log = () => {
		if (editorRef.current) {
			const editorContent = editorRef.current.getContent();
		}
	};

	return (
		<div>
			<h1>Add New Post</h1>
			<form>
				<label>
					Title: <br />
					<input type="text" value={title} onChange={handleTitleChange} />
				</label>
				<br />
				<label htmlFor='editor'>
					Content:
					{/* <textarea value={content} onChange={handleContentChange} /> */}
					<Editor id='editor'
						apiKey='fs1217l0slezwnzgyvtz6c5myup04fc87y1wrnvq079e8e5o'
						onInit={(evt, editor) => {
							editorRef.current = editor;
						}}
						initialValue="This is the initial content of the editor."
						init={{
							height: 500,
							menubar: false,
							plugins: [
								"advlist autolink lists link image charmap print preview anchor",
								"searchreplace visualblocks code fullscreen",
								"insertdatetime media table paste code help wordcount",
							],
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
        <button type="button" onClick={log}>Log editor content</button>
				<br />
				<button type="submit">Save</button>
			</form>
		</div>
	);
}

export default addPost;
