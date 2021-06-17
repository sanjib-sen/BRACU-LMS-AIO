import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import AppNavBar from "../components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../components/footer";
import Head from "next/head";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));
const columns = [
	{ field: "id", hide: true },
	{ field: "raw", hide: true },
	{ field: "date", headerName: "Deadline", width: 180, sortable: false },
	{ field: "courseID", headerName: "Course", width: 122 },
	{ field: "type", headerName: "Assesment Type", width: 200 },
	{
		field: "title",
		headerName: "Assesment Name",
		sortable: false,
		width: 450,
	},
];

const DataTable = () => {
	const classes = useStyles();
	const [courses, setCourses] = useState([]);
	const all = [];
	useEffect(() => {
		var list = [];
		const cookies = localStorage.getItem("cookies");
		const links = localStorage.getItem("courses").split(",");
		async function fetchAPI(link) {
			await fetch(`/api/alltasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ cookies, link }),
			})
				.then((tmpres) => tmpres.json())
				.then((data) => list.push(data));
		}

		async function childTask() {
			const promises = links.map(async (link) => {
				return await fetchAPI(link);
			});
			await Promise.all(promises);
		}

		(async () => {
			await childTask()
				.then(() =>
					list.map(
						async (course) =>
							await course.map(async (task) => all.push(task)),
					),
				)
				.then(async () => setCourses(all));
		})();
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
		if (localStorage.getItem("cookies") != null) {
			if (localStorage.getItem("courses") == null) {
				window.location.href = "dashboard";
			}
		} else {
			window.location.href = "login";
		}
	}
	return (
		<div>
			<Head>
				<title>All Deadlines</title>
			</Head>
			{getData() ? goTo() : ""}
			<AppNavBar>
				<Typography variant="h6" className={classes.title}>
					All
				</Typography>
			</AppNavBar>
			{courses.length > 0 ? (
				<div>
					<Grid style={{ height: 900, width: "100%" }}>
						<DataGrid
							disableSelectionOnClick
							rows={courses}
							columns={columns}
							pageSize={15}
							sortModel={[
								{
									field: "raw",
									sort: "desc",
								},
							]}
						/>
					</Grid>
				</div>
			) : (
				<Typography variant="h4" align="center">
					Retrieving Data..... <br></br> Please wait
				</Typography>
			)}
			<Footer />
		</div>
	);
};

export default DataTable;
