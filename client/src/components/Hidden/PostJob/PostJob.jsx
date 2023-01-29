import React, { useState } from 'react';
import classes from './PostJob.module.css';
import { Button, Card, Input } from '../../common';
import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

const PostJob = () => {
	const [img, setImg] = useState(null);
	const [imgPreview, setImgPreview] = useState(null);
	const [job, setJob] = useState({
		role: '',
		location: '',
		stipend: '',
		companyName: '',
		batch: '',
		description: '',
	});

	const { role, location, stipend, companyName, batch, description } = job;

	const onChangeHandler = (e) => {
		setJob({
			...job,
			[e.target.name]: e.target.value,
		});
		// console.log(job);
	};

	const onImageChange = (e) => {
		const [file] = e.target.files;
		setImgPreview(URL.createObjectURL(file));
		setImg(e.target.files);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		if (
			role === '' ||
			location === '' ||
			stipend === '' ||
			companyName === '' ||
			batch === '' ||
			description === ''
		) {
			// AlertContext.setAlert("Please enter all fields", "danger"); add a state
			alert('Please fill all  the fields');
		} else {
			const dataArray = new FormData();
			dataArray.append('role', role);
			dataArray.append('location', location);
			dataArray.append('stipend', stipend);
			dataArray.append('companyName', companyName);
			dataArray.append('batch', batch);
			dataArray.append('description', description);
			dataArray.append('image', img['0'], img['0'].name);
			console.log(dataArray);
		}
		try {
			axios.post('/job/createJob', dataArray, config).then(
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log(error);
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteAllJobs = async () => {
		try {
			axios.delete('/job/deleteJobs');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<h2 className={classes.heading}>Post a Job</h2>
			<Button label="Delete All Jobs" onClick={deleteAllJobs} />

			<form className={classes.form} onSubmit={submitHandler}>
				<Input
					onChange={onChangeHandler}
					type="text"
					value={role}
					label="Role"
					name="role"
					required
				/>
				<Input
					onChange={onChangeHandler}
					type="text"
					value={location}
					label="Location"
					name="location"
					required
				/>
				<Input
					onChange={onChangeHandler}
					type="text"
					value={companyName}
					label="Company Name"
					name="companyName"
					required
				/>
				<Input
					onChange={onChangeHandler}
					type="text"
					value={stipend}
					label="Stipend"
					name="stipend"
					required
				/>
				<Input
					onChange={onChangeHandler}
					type="text"
					value={batch}
					label="Batch"
					name="batch"
					required
				/>
				<Input
					onChange={onChangeHandler}
					type="text"
					value={description}
					label="Description"
					name="description"
					required
				/>
				<input
					className={classes.custom_file_input}
					type="file"
					onChange={onImageChange}
					name="image"
				/>
				<Button label="Create" />
			</form>
			<Card data={job} companyImage={imgPreview} />
		</>
	);
};

export default PostJob;
