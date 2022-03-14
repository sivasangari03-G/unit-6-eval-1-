import axios from "axios";

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const PostData = () => {
	const [street, setStreet] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate()
	const [area, setArea] = useState("");
	const handlePost = () => {
		axios
			.post("http://localhost:8000/api/addresses", {
				Street: street,
				Area: area,
			})
			.then(function (response) {
				// console.log(response.data.data.allData);
				setData(response.data.data.allData);
			})
			.catch(function (error) {
				console.log(error);
            });
        
        navigate("/");
	};

	return (
		<div>
			<div>
				<input
					type="text"
					placeholder="enter street name"
					value={street}
					onChange={(e) => setStreet(e.currentTarget.value)}
				/>
				<input
					type="text"
					placeholder="enter area name"
					value={area}
					onChange={(e) => setArea(e.currentTarget.value)}
				/>
			</div>
			<button onClick={handlePost}>Click To Post Data</button>
		</div>
	);
};
