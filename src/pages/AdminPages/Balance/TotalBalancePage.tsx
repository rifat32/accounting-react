import React, { useEffect, useState } from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";

const TotalBalancePage: React.FC = () => {
	const [total, setTotal] = useState(0);
	useEffect(() => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/balance`)
			.then((response: any) => {
				console.log(response);
				setTotal(response.data.balance);
			})
			.catch((error) => {
				console.log(error.response);
			});
	});
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Balance</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Balance</li>
							<li className="breadcrumb-item active">Total Balance</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Total Balance</h5>
									{total}
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default TotalBalancePage;