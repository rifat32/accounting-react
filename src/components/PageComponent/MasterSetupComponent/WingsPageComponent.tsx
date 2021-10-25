import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import AddWingForm from "../../Forms/MasterSetupForms/AddWingsForm";
import CustomModal from "../../Modal/Modal";
import EditWingForm from "../../Forms/MasterSetupForms/EditWingsForm";
import { toast } from "react-toastify";

const WingsPageComponent: React.FC = () => {
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);
	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/wings`);
	const [currentLink, setCurrentLink] = useState(`${BACKENDAPI}/v1.0/wings`);
	const updateDataStates = (updatedWing: any) => {
		const tempWings = data.map((el: any) => {
			if (el.id === updatedWing.id) {
				return updatedWing;
			}
			return el;
		});
		setData(tempWings);
	};
	useEffect(() => {
		loadData(link);
	}, []);
	// pagination required
	const loadData = (link: string = currentLink) => {
		apiClient()
			.get(link)
			.then((response: any) => {
				console.log(response);
				setData([...data, ...response.data.wings.data]);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const deleteData = (id: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			apiClient()
				.delete(`${BACKENDAPI}/v1.0/wings/${id}`)
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
						<th scope="col">Name</th>
						<th scope="col">Action</th>
					</tr>
				</thead>

				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.name}</td>
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
				type="Update Wing">
				<AddWingForm
					value={currentData}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default WingsPageComponent;
