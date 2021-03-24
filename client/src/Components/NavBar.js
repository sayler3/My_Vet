import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Notify from "./Modals/Notify";
import PetContext from "../Context/PetContext";
import { Modal } from "react-bootstrap";
import HandleAppoint from "./Helpers/HandleAppoint";

const NavBar = () => {
	const { userData, setUserData } = useContext(UserContext);
	const [links, setLinks] = useState(null);
	const { appt, setAppt } = useContext(PetContext);
	const { pets } = useContext(PetContext);
	const [show, setShow] = useState(false);
	const [vals, setVals] = useState([]);

	const logout = () => {
		setUserData({ token: undefined, user: undefined });
		localStorage.setItem("auth-token", "");
	};

	const linkStyle = {
		textDecoration: "none",
		color: "black",
		// margin: "25px",
	};

	const handleClose = () => {
		setShow(false);
	};

	useEffect(async () => {
		if (!userData.user) {
			setLinks(
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link" to="/login" style={linkStyle}>
							Login
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/register" style={linkStyle}>
							Register
						</Link>
					</li>
				</ul>
			);
		} else {
			setLinks(
				<ul className="navbar-nav">
					{appt > 0 && (
						<li className="nav-item">
							<Link
								onClick={(e) => {
									e.preventDefault();
									setShow(true);
								}}
							>
								<i className="bi bi-bell"></i>
								<span className="badge">{appt}</span>
							</Link>
						</li>
					)}
					<li className="nav-item">
						<Link
							className="nav-link"
							to="/"
							style={linkStyle}
							onClick={logout}
						>
							Log Out
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/home" style={linkStyle}>
							Home
						</Link>
					</li>
				</ul>
			);
			setAppt(HandleAppoint(pets, "nav"));

			appt && setVals(HandleAppoint(pets, "notify"));
		}
	}, [userData, appt, pets]);

	return (
		<>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<h3 className="navbar-brand">MyPet</h3>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						{links}
						<Modal name="test" show={show} onHide={handleClose}>
							<Modal.Body>
								<Notify vals={vals} />
							</Modal.Body>
						</Modal>
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavBar;
