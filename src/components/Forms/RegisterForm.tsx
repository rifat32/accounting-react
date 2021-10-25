import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { BACKEND } from "../../config";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import { AppContext } from "../../context";

interface RegisterInfo {
	name: "";
	email: string;
	password: string;
	password_confirmation: string;
}
const RegisterForm: React.FC = (props: any) => {
	const { user, setUserFunction, setUserLoadingFunction } =
		useContext(AppContext);
	const [state, setState] = useState<RegisterInfo>({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<string[]>([]);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setErrors([]);
		setUserLoadingFunction(true);
		axios
			.post(`${BACKEND}/api/v1.0/register`, {
				...state,
			})
			.then((response: any) => {
				console.log(response.data);
				localStorage.setItem("token", response.data.token);
				toast.success("Registration Successfull.");
				setUserFunction(response.data.data);
				setLoading(false);
				setUserLoadingFunction(false);
			})
			.catch((err) => {
				setUserLoadingFunction(false);
				if (err.response.status === 422) {
					setErrors(err.response.data.errors);
				}

				console.log(err.response);
				setLoading(false);
			});
	};
	useEffect(() => {
		if (user) {
			props.history.push("/");
		}
	}, [user]);

	return (
		<>
			<form className="row g-3" noValidate onSubmit={handleSubmit}>
				<div className="col-12">
					<label htmlFor="yourPassword" className="form-label">
						Name
					</label>
					<input
						type="text"
						name="name"
						className="form-control"
						id="yourPassword"
						required
						onChange={handleChange}
						value={state.name}
					/>
				</div>
				<div className="col-12">
					<label htmlFor="yourEmail" className="form-label">
						Email
					</label>
					<div className="input-group has-validation">
						<span className="input-group-text" id="inputGroupPrepend">
							@
						</span>
						<input
							type="text"
							name="email"
							className="form-control"
							id="yourEmail"
							required
							onChange={handleChange}
							value={state.email}
						/>
					</div>
				</div>
				<div className="col-12">
					<label htmlFor="yourPassword" className="form-label">
						Password
					</label>
					<input
						type="password"
						name="password"
						className="form-control"
						id="yourPassword"
						required
						onChange={handleChange}
						value={state.password}
					/>
				</div>
				<div className="col-12">
					<label htmlFor="yourPassword" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						name="password_confirmation"
						className="form-control"
						id="yourPassword"
						required
						onChange={handleChange}
						value={state.password_confirmation}
					/>
				</div>
				{/* <div className="col-12">
													<div className="form-check">
														<input
															className="form-check-input"
															type="checkbox"
															name="remember"
															defaultValue="true"
															id="rememberMe"
														/>
														<label
															className="form-check-label"
															htmlFor="rememberMe">
															Remember me
														</label>
													</div>
												</div> */}
				{errors.length ? (
					<div className="col-12">
						<div>
							<div
								className="alert alert-danger py-2 text-center"
								role="alert">
								{errors[0]}
							</div>
						</div>
					</div>
				) : null}

				{loading && (
					<div className="col-12">
						<div className="text-center">
							<Loader
								type="Puff"
								color="#00BFFF"
								height={50}
								width={50}
							/>
						</div>
					</div>
				)}

				<div className="col-12">
					<button className="btn btn-primary w-100" type="submit">
						Create Account
					</button>
				</div>

				<div className="col-12">
					<p className="small mb-0">
						Already have an account? <Link to="/login">Log in</Link>
					</p>
				</div>
			</form>
		</>
	);
};

export default withRouter(RegisterForm);
