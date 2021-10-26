import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const ParchasesPageComponent: React.FC = () => {
	const [data, setData] = useState<any>([]);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/parchases`);
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

				setData([...data, ...response.data.parchases.data]);
				setNextPageLink(response.data.parchases.next_page_url);
				setPrevPageLink(response.data.parchases.prev_page_url);
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
									<td>{el.product.name}</td>
									<td>{el.product.price}</td>
									<td>{el.payment_method}</td>
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

export default ParchasesPageComponent;
