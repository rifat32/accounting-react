import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const RequisitionsPageComponent: React.FC = () => {
	const [requisitions, setRequisitions] = useState([]);
	const [currentLink, setCurrentLink] = useState(
		`${BACKENDAPI}/v1.0/requisitions`
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
				setRequisitions(response.data.requisitions.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const moveToParchase = (id: string | number) => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/requisitionToParchase`, {
				id: id,
			})
			.then((response: any) => {
				console.log(response);
				const newRequisitions = requisitions.filter((el: any) => {
					return el.id !== id;
				});
				setRequisitions(newRequisitions);
				toast("Moved To Parchase");
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
						<th scope="col">Supplier</th>
						<th scope="col">ReferenceNo</th>
						<th scope="col">PurchaseDate</th>
						<th scope="col">PurchaseStatus</th>
						{/* <th scope="col">ProductId</th> */}
						<th scope="col">Amount</th>
						<th scope="col">PaymentMethod</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{requisitions.length ? (
					<tbody>
						{requisitions.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.rSupplier}</td>
									<td>{el.rReferenceNo}</td>
									<td>{el.rPurchaseDate}</td>
									<td>{el.rPurchaseStatus}</td>
									{/* <td>{el.rProductId}</td> */}
									<td>{el.rAmount}</td>
									<td>{el.rPaymentMethod}</td>
									<td onClick={() => moveToParchase(el.id)}>
										<button
											type="button"
											className="btn 
										btn-sm
										btn-primary ">
											Move to Parchase
										</button>
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

export default RequisitionsPageComponent;