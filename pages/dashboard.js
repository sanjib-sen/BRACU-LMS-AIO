import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const columns = [
	{ field: "id", hide: true },
	{ field: "course_id", headerName: "Course Short Code", width: 300 },
	{
		field: "title",
		headerName: "Course Title",
		sortable: false,
		width: 900,
	},
];
var lst = [];

function submitHandler() {
	console.log(lst);
	localStorage.setItem("courses", lst);
	window.location.href = "http://localhost:3000/courses";
}

const DataTable = () => {
	const [rows, setRow] = useState([]);
	useEffect(() => {
		const cookies = localStorage.getItem("cookies");
		async function fetchAPI() {
			await fetch(`/api/dashboard`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ cookies }),
			})
				.then((tmpres) => tmpres.json())
				.then((data) => setRow(data));
		}
		fetchAPI();
	}, []);

	return (
		<div>
			// align="center"
			<Typography variant="h4">
				Select your advised courses for this semester
			</Typography>
			<div style={{ height: 650, width: "100%" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={10}
					checkboxSelection
					onSelectionModelChange={(e) => (lst = e.selectionModel)}
				/>
				<Grid
					container
					align="center"
					justify="space-around"
					spacing="5"
					p={10}
				>
					<Grid item p={10}>
						<Button
							align="center"
							justify="center"
							p={10}
							onClick={submitHandler}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default DataTable;
