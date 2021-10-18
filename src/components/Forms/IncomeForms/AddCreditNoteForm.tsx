import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	date: string;
	amount: string;
	account_number: string;
	customer: string;
	description: string;
	category: string;
	reference: string;
	wing_id: string;
}

const AddCreditNoteForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		date: "",
		amount: "",
		account_number: "",
		customer: "",
		description: "",
		category: "",
		reference: "",
		wing_id: "",
	});
	const [wings, setWings] = useState([]);
	const [errors, setErrors] = useState<any>(null);
	useEffect(() => {
		loadWings();
	}, []);

	const loadWings = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/wings/all`)
			.then((response: any) => {
				console.log(response);
				setWings(response.data.wings);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	// handle Change Function
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			date: "",
			amount: "",
			account_number: "",
			customer: "",
			description: "",
			category: "",
			reference: "",
			wing_id: "",
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		setErrors(null);
		apiClient()
			.post(`${BACKENDAPI}/v1.0/credit-notes`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("credit note saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				if (
					error.response.status === 404 ||
					error.response.status === 400
				) {
					toast.error(error.response.data.message);
				}
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}
			});
	};

	return (
		<form className="row g-3">
			<div className="col-md-12">
				<label htmlFor="bill" className="form-label">
					Wing
				</label>
				<select
					className={
						errors
							? errors.wing_id
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="wing_id"
					name="wing_id"
					onChange={handleSelect}
					value={formData.wing_id}>
					<option value="">Please Select</option>
					{wings.map((el: any, index) => (
						<option
							key={index}
							value={el.id}
							style={{ textTransform: "uppercase" }}>
							{el.name}
						</option>
					))}
				</select>

				{errors?.wing_id && (
					<div className="invalid-feedback">{errors.wing_id[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="date" className="form-label">
					Date
				</label>
				<input
					type="date"
					className={
						errors
							? errors.date
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="date"
					name="date"
					onChange={handleChange}
					value={formData.date}
				/>

				{errors?.date && (
					<div className="invalid-feedback">{errors.date[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="amount" className="form-label">
					Amount
				</label>
				<input
					type="number"
					className={
						errors
							? errors.amount
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="amount"
					name="amount"
					onChange={handleChange}
					value={formData.amount}
				/>

				{errors?.amount && (
					<div className="invalid-feedback">{errors.amount[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="account_number" className="form-label">
					Account
				</label>
				<input
					type="text"
					className={
						errors
							? errors.account_number
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="account_number"
					name="account_number"
					onChange={handleChange}
					value={formData.account_number}
				/>

				{errors?.account_number && (
					<div className="invalid-feedback">
						{errors.account_number[0]}
					</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="customer" className="form-label">
					Customer
				</label>
				<input
					type="text"
					className={
						errors
							? errors.customer
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="customer"
					name="customer"
					onChange={handleChange}
					value={formData.customer}
				/>

				{errors?.customer && (
					<div className="invalid-feedback">{errors.customer[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-12">
				<label htmlFor="date" className="form-label">
					Description
				</label>
				<textarea
					className={
						errors
							? errors.description
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="description"
					name="description"
					onChange={handleTextArea}
					value={formData.description}></textarea>

				{errors?.description && (
					<div className="invalid-feedback">{errors.description[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="category" className="form-label">
					Category
				</label>
				<input
					type="text"
					className={
						errors
							? errors.category
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="category"
					name="category"
					onChange={handleChange}
					value={formData.category}
				/>

				{errors?.category && (
					<div className="invalid-feedback">{errors.category[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="category" className="form-label">
					Reference
				</label>
				<input
					type="text"
					className={
						errors
							? errors.reference
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="reference"
					name="reference"
					onChange={handleChange}
					value={formData.reference}
				/>

				{errors?.reference && (
					<div className="invalid-feedback">{errors.reference[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>

			<div className="text-center">
				<button
					onClick={handleSubmit}
					type="button"
					className="btn btn-primary me-2">
					Submit
				</button>
				<button
					type="button"
					onClick={resetFunction}
					className="btn btn-secondary">
					Reset
				</button>
			</div>
		</form>
	);
};

export default AddCreditNoteForm;
