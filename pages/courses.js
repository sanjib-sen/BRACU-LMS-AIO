import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import AppNavBar from "../components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../components/footer";
import Head from "next/head";

const columns = [
	{ field: "id", hide: true },
	{ field: "raw", hide: true },
	{ field: "date", headerName: "Deadline", width: 180, sortable: false },
	{ field: "type", headerName: "Assesment Type", width: 200, width: 200 },
	{
		field: "title",
		headerName: "Assesment Name",
		sortable: false,
		width: 450,
	},
];

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

const DataTable = () => {
	const classes = useStyles();
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		var list = [];
		const cookies = localStorage.getItem("cookies");
		const links = localStorage.getItem("courses").split(",");
		async function fetchAPI(link) {
			const courseID = link.split("+")[1];
			await fetch(`/api/tasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ cookies, link }),
			})
				.then((tmpres) => tmpres.json())
				.then((data) => list.push({ courseId: courseID, rows: data }));
		}

		// One by One:
		async function childTask() {
			for (const link of links) {
				await fetchAPI(link).then(() => setCourses(list));
			}
		}
		// Parallel:
		// async function childTask() {
		// 	const promises = links.map(async (link) => {
		// 		return await fetchAPI(link);
		// 	});

		// 	await Promise.all(promises);
		// }

		(async () => {
			await childTask().then(() => setCourses(list));
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
				<title>Show by Courses</title>
			</Head>

			{getData() ? goTo() : ""}

			<AppNavBar>
				<Typography variant="h6" className={classes.title}>
					Deadlines by Course
				</Typography>
			</AppNavBar>
			{courses.length > 0 ? (
				courses.map((course) => (
					<div>
						<Typography variant="h4" align="center">
							{course.courseId}
						</Typography>
						<Grid style={{ height: 550, width: "100%" }}>
							<DataGrid
								disableSelectionOnClick
								rows={course.rows}
								columns={columns}
								pageSize={8}
								density
								sortModel={[
									{
										field: "raw",
										sort: "asc",
									},
								]}
							/>
						</Grid>
					</div>
				))
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
