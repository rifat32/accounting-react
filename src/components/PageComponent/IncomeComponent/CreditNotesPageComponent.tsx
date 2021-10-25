import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const CreditNotesPageComponent: React.FC = () => {
	const [creditNotes, setCreditNotes] = useState([]);
	const [currentLink, setCurrentLink] = useState(
		`${BACKENDAPI}/v1.0/credit-notes`
	);
	useEffect(() => {
		loadCreditNotes();
	}, []);
	// pagination required
	const loadCreditNotes = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setCreditNotes(response.data.creditNotes.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const ApproveFunc = (id: number) => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/credit-notes/approve`, {
				id: id,
			})
			.then((response: any) => {
				toast.success("credit notes approved");
				const tempRevenue: any = creditNotes.map((el: any) => {
					if (el.id === id) {
						el.status = 1;
					}
					return el;
				});
				setCreditNotes(tempRevenue);

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
						<th scope="col">Customer</th>
						<th scope="col">Description</th>
						<th scope="col">Category</th>
						<th scope="col">Reference</th>
						<th scope="col">Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{creditNotes.length ? (
					<tbody>
						{creditNotes.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.wing.name}</td>
									<td>{el.date}</td>
									<td>{el.amount}</td>
									<td>{el.account_number}</td>
									<td>{el.customer}</td>
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

export default CreditNotesPageComponent;
