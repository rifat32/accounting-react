import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const BillsPageComponent: React.FC = () => {
	const [bills, setBills] = useState([]);
	const [currentLink, setCurrentLink] = useState(`${BACKENDAPI}/v1.0/bills`);
	useEffect(() => {
		loadBills();
	}, []);
	// pagination required
	const loadBills = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setBills(response.data.bills.data);
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
						<th scope="col">Vendor</th>
						<th scope="col">Bill Date</th>
						<th scope="col">Due Date</th>
						<th scope="col">Category</th>
						<th scope="col">Order Number</th>
						<th scope="col">Discount Apply</th>
					</tr>
				</thead>
				{/* 
		
		 // {
            //     "vendor": "abcd",
            //     "billDate": "2021-10-14",
            //     "dueDate": "2021-10-15",
            //     "category": "eargeg",
            //     "orderNumber": "efewsf",
            //     "discountApply": false
            // }
		*/}
				{bills.length ? (
					<tbody>
						{bills.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.wing.name}</td>
									<td>{el.vendor}</td>
									<td>{el.bill_date}</td>
									<td>{el.due_date}</td>
									<td>{el.category}</td>
									<td>{el.order_number}</td>
									<td>{el.discount_apply ? "true" : "false"}</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</>
	);
};

export default BillsPageComponent;
