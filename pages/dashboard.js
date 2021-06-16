import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import AppNavBar from "../components/DashBar";
import Footer from "../components/footer";
import Alert from "@material-ui/lab/Alert";

const columns = [
	{ field: "id", hide: true },
	{ field: "semester", headerName: "Semester", flex: 1 },
	{ field: "course_id", headerName: "Course Code", flex: 1 },
	{
		field: "title",
		headerName: "Course Title",
		sortable: false,
		flex: 6,
	},
];
var lst = [];

const DataTable = () => {
	const [rows, setRow] = useState([]);
	const [warning, setWarning] = useState();

	function submitHandler() {
		if (lst.length < 7) {
			setWarning(null);
			console.log(lst);
			localStorage.setItem("courses", lst);
			window.location.href = "summary";
		} else {
			setWarning("warning");
		}
	}

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
	function getData() {
		try {
			localStorage.getItem("cookies");
		} catch (error) {
			return false;
		}
		return true;
	}

	function goTo() {
		if (localStorage.getItem("cookies") == null) {
			window.location.href = "login";
		}
	}
	return (
		<div>
			{getData() ? goTo() : ""}
			<AppNavBar></AppNavBar>
			{warning != null ? (
				<Alert severity="error">
					আমি DMC Topper না তাই ৬ টার বেশি কোর্স সামলাতে পারিনা!
				</Alert>
			) : (
				""
			)}
			{rows.length > 0 ? (
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
			) : (
				<Typography variant="h4" align="center">
					Retrieving Data.... <br></br> Please Wait
				</Typography>
			)}
			<Footer />
		</div>
	);
};

export default DataTable;
