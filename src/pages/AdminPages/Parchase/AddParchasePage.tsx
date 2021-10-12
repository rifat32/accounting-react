import React from "react";
import AdminPageComponent from "../../../components/AdminPageComponent/AdminPageComponent";
import AddParchaseForm from "../../../components/Forms/ParchaseForms/AddParchaseForm";

const AddParchasePage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add Parchase</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Parchase</li>
							<li className="breadcrumb-item active">Parchase Create</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Parchase</h5>
									<AddParchaseForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddParchasePage;
