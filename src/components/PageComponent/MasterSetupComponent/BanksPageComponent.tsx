import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import CustomModal from "../../Modal/Modal";
import AddBankForm from "../../Forms/MasterSetupForms/AddBankForm";
import { toast } from "react-toastify";

const BanksPageComponent: React.FC = () => {
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);
	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/banks`);
	const [currentLink, setCurrentLink] = useState(`${BACKENDAPI}/v1.0/banks`);
	const updateDataStates = (updatedData: any) => {
		const tempDatas = data.map((el: any) => {
			if (parseInt(el.id) === parseInt(updatedData.id)) {
				return updatedData;
			}
			return el;
		});
		setData(tempDatas);
	};
	useEffect(() => {
		loadData(link);
	}, []);
	// pagination required
	const loadData = (link: string = currentLink) => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setData(response.data.banks.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const deleteData = (id: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			apiClient()
				.delete(`${BACKENDAPI}/v1.0/banks/${id}`)
				.then((response: any) => {
					console.log(response);
					const tempDatas = data.filter((el: any) => {
						return el.id !== id;
					});
					setData(tempDatas);
					toast.success("data deleted successfully");
				})
				.catch((error) => {
					console.log(error.response);
				});
		}
	};

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Wing</th>
						<th scope="col">Bank Name</th>
						<th scope="col">Account Number</th>
						<th>Action</th>
					</tr>
				</thead>
				{/* 
		// {
            $table->string("name");
            $table->string("account_number");
            $table->string("wing_id");
            // }
		*/}
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.wing.name}</td>
									<td>{el.name}</td>
									<td>{el.account_number}</td>
									<td>
										<div className="btn-group">
											<button
												type="button"
												className="btn btn-sm btn-primary dropdown-toggle"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												Action
											</button>
											<ul className="dropdown-menu action">
												<li>
													<a
														onClick={() => {
															setCurrentData(el);
															showModal(true);
														}}
														className="dropdown-item"
														href="#">
														edit
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
												<li>
													<a
														onClick={() => {
															deleteData(el.id);
														}}
														className="dropdown-item"
														href="#">
														delete
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
											</ul>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
			<CustomModal
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Update Bank">
				<AddBankForm
					value={currentData}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default BanksPageComponent;
