import React from "react";
import AdminPageComponent from "../../../components/AdminPageComponent/AdminPageComponent";
import ListProductsPageComponent from "../../../components/AdminPageComponent/AdminProductComponent/ListProductsPageComponent";

const ProductsList: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>List Products</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Products</li>
							<li className="breadcrumb-item active">List Products</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">All Products</h5>
									<ListProductsPageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ProductsList;
