import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const RequisitionsPageComponent: React.FC = () => {
	const [data, setData] = useState<any>([]);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/requisitions`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");
	useEffect(() => {
		loadData(link);
	}, []);
	// pagination required
	const loadData = (link: string) => {
		apiClient()
			.get(link)
			.then((response: any) => {
				console.log(response);
				setData([...data, ...response.data.requisitions.data]);
				setNextPageLink(response.data.requisitions.next_page_url);
				setPrevPageLink(response.data.requisitions.prev_page_url);
			})
			.catch((error) => {
				console.log(error.response, "ggg");
			});
	};
	const moveToParchase = (id: string | number) => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/requisitionToParchase`, {
				id: id,
			})
			.then((response: any) => {
				console.log(response);
				const newRequisitions = data.filter((el: any) => {
					return el.id !== id;
				});
				setData(newRequisitions);
				toast("Moved To Parchase");
			})
			.catch((error) => {
				console.log(error.response);
				if (
					error.response.status === 404 ||
					error.response.status === 400 ||
					error.response.status === 403
				) {
					toast.error(error.response.data.message);
				}
			});
	};
	return (
		<>
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
						<th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
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
									<td onClick={() => moveToParchase(el.id)}>
										<button
											type="button"
											className="btn 
										btn-sm
										btn-primary ">
											Approve to Parchase
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
			<div className="text-center">
				{nextPageLink ? (
					<button
						className="btn btn-primary"
						onClick={() => {
							loadData(nextPageLink);
						}}>
						Load More ...
					</button>
				) : data.length ? (
					prevPageLink ? (
						"No more data to show"
					) : (
						""
					)
				) : (
					"No data to show"
				)}
			</div>
		</>
	);
};

export default RequisitionsPageComponent;
