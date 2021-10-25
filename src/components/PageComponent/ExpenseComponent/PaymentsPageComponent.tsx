import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const PaymentsPageComponent: React.FC = () => {
	const [payments, setPayments] = useState([]);
	const [currentLink, setCurrentLink] = useState(
		`${BACKENDAPI}/v1.0/payments`
	);
	useEffect(() => {
		loadProducts();
	}, []);
	// pagination required
	const loadProducts = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setPayments(response.data.payments.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const ApproveFunc = (id: number) => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/payments/approve`, {
				id: id,
			})
			.then((response: any) => {
				toast.success("payment approved");
				const tempRevenue: any = payments.map((el: any) => {
					if (el.id === id) {
						el.status = 1;
					}
					return el;
				});
				setPayments(tempRevenue);

				console.log(response);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Wing</th>
						<th scope="col">Date</th>
						<th scope="col">Amount</th>
						<th scope="col">Account</th>
						<th scope="col">Description</th>
						<th scope="col">Category</th>
						<th scope="col">Reference</th>
						<th scope="col">Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>

				{payments.length ? (
					<tbody>
						{payments.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.wing.name}</td>
									<td>{el.date}</td>
									<td>{el.amount}</td>
									<td>{el.account_number}</td>
									<td>{el.description}</td>
									<td>{el.category}</td>
									<td>{el.reference}</td>
									<td>{el.status ? "approved" : "pending"}</td>
									<td>
										<div className="dropdown">
											<span className="btn btn-primary btn-sm">
												Action
											</span>
											<div className="dropdown-content">
												<div className="d-grid gap-2">
													<button
														className="btn d_btn btn-sm"
														type="button"
														onClick={() => ApproveFunc(el.id)}>
														Approve
													</button>
												</div>
											</div>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</>
	);
};

export default PaymentsPageComponent;
