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
		<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column',alignItems:"center" }}>
			<button onClick={handleClick} style={{padding:" 10px 20px", marginTop: "20px", width: "300px"}}>Click Here To Go To Create Data Page</button>
			<div style={{display: 'flex', justifyContent: 'center', flexDirection: "column"}}>
				{value.map((el) => {
					return (
						<div style={{border: '1px solid black', width: "200px", margin: "20px", padding: "20px", background: "black", color: "white"}}>
							<div>{`Street: ${el.Street}`}</div>
							<div>{`Area: ${el.Area}`}</div>
							<button style={{padding: "3px 20px"}} onClick ={handleDelete}>Delete</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};
