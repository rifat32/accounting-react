import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const ParchasesPageComponent: React.FC = () => {
	const [parchased, setParchases] = useState([]);
	const [currentLink, setCurrentLink] = useState(
		`${BACKENDAPI}/v1.0/parchases`
	);
	useEffect(() => {
		loadParchases();
	}, []);
	// pagination required
	const loadParchases = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setParchases(response.data.parchases.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<>
			{/* 
		
		   // {
            //     "rSupplier": "",
            //     "rReferenceNo": "",
            //     "rPurchaseDate": "",
            //     "rPurchaseStatus": "",
            //     "rProductId": 2,
            //     "rAmount": "",
            //     "rPaymentMethod": ""
            // }
		*/}
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Wing</th>
						<th scope="col">Supplier</th>
						<th scope="col">Reference</th>
						<th scope="col">Date</th>
						<th scope="col">Status</th>
						{/* <th scope="col">ProductId</th> */}
						<th scope="col">Product</th>
						<th scope="col">Amount</th>
						<th scope="col">Payment Method</th>
					</tr>
				</thead>
				{parchased.length ? (
					<tbody>
						{parchased.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.wing.name}</td>
									<td>{el.supplier}</td>
									<td>{el.reference_no}</td>
									<td>{el.purchase_date}</td>
									<td>{el.purchase_status}</td>
									{/* <td>{el.rProductId}</td> */}
									<td>{el.product.name}</td>
									<td>{el.product.price}</td>
									<td>{el.payment_method}</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</>
	);
};

export default ParchasesPageComponent;
