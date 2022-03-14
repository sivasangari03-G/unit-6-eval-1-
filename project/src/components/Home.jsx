import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const axios = require("axios");
export const Home = () => {
	const [value, setUseValue] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get("http://localhost:8000/api/addresses")
			.then(function (response) {
				// console.log("response", response.data.data.allData);
				setUseValue(response.data.data.allData);
			})
			.catch(function (error) {
				console.log(error);
			});
	});
	const handleClick = () => {
		navigate("/api/addresses");
	};
	const handleDelete = (e) => {
		const id = e.target.parentNode.remove();
		console.log(id);
	}
	return (
		<div>
			<button onClick={handleClick}>Click To Post Data</button>
			<div>
				{value.map((el) => {
					return (
						<div>
							<div>{`Street: ${el.Street}`}</div>
							<div>{`Area: ${el.Area}`}</div>
							<button onClick ={handleDelete}>Delete</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};
