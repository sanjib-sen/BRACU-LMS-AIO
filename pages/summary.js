import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarDensitySelector } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import AppNavBar from "../components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../components/footer";

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
	{ field: "date", headerName: "Deadline", width: 200, sortable: false },
	{ field: "courseID", headerName: "Course", width: 200 },
	{ field: "type", headerName: "Assesment Type", width: 200 },
	{
		field: "title",
		headerName: "Assesment Name",
		sortable: false,
		width: 900,
	},
];
const today_raw = new Date();
const date = new Date().toISOString().slice(0, 10);
const todays_date = parseInt(date.slice(8, 10));
const todays_mm = date.slice(5, 7);
const todays_yy = date.slice(0, 4);
const DataTable = () => {
	const classes = useStyles();
	const [courses, setCourses] = useState([]);
	const all = [];
	const today = [];
	const tomorrow = [];
	const thisWeek = [];
	const thisMonth = [];
	const summary = [];
	useEffect(() => {
		var list = [];
		const cookies = localStorage.getItem("cookies");
		const links = localStorage.getItem("courses").split(",");
		async function fetchAPI(link) {
			await fetch(`/api/courses`, {
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

		async function setToday(list) {
			list.map((task) => {
				if (task.raw.slice(0, 10) == date) {
					today.push(task);
				}
			});
		}
		async function setTomorrow(list) {
			list.map((task) => {
				const task_date = parseInt(task.raw.slice(8, 10));
				const task_mm = task.raw.slice(5, 7);
				const task_yy = task.raw.slice(0, 4);
				if (
					task_date + 1 == todays_date &&
					task_mm == todays_mm &&
					task_yy == todays_yy
				) {
					tomorrow.push(task);
				}
			});
		}

		async function setThisWeek(list) {
			list.map((task) => {
				const task_day = task.raw.slice(0, 10);
				const task_date = parseInt(task.raw.slice(8, 10));
				const task_mm = task.raw.slice(5, 7);
				const task_yy = task.raw.slice(0, 4);
				const nextWeek = new Date(
					today_raw.getTime() + 7 * 24 * 60 * 60 * 1000,
				)
					.toISOString()
					.slice(0, 10);

				if (task_day > date && task_day < nextWeek) {
					thisWeek.push(task);
				}
			});
		}

		async function setThisMonth(list) {
			list.map((task) => {
				if (task.raw.slice(5, 7) == todays_mm) {
					thisMonth.push(task);
				}
			});
		}

		(async () => {
			await childTask()
				.then(() =>
					list.map(
						async (course) =>
							await course.map(async (task) => all.push(task)),
					),
				)
				.then(() => setToday(all))
				.then(() => summary.push({ label: "Today", data: today }))
				.then(() => setTomorrow(all))
				.then(() => summary.push({ label: "Tomorrow", data: tomorrow }))
				.then(() => setThisWeek(all))
				.then(() =>
					summary.push({ label: "In This Week", data: thisWeek }),
				)
				.then(() => setThisMonth(all))
				.then(() =>
					summary.push({ label: "In This Month", data: thisMonth }),
				)
				.then(() => setCourses(summary));
		})();
	}, []);

	return (
		<div>
			<AppNavBar>
				<Typography variant="h6" className={classes.title}>
					At a Glance
				</Typography>
			</AppNavBar>
			{courses.length > 0 ? (
				courses.map((course) => (
					<div>
						<Typography variant="h4">
							<br></br>
							{course.label} :
						</Typography>
						<Grid style={{ height: 550, width: "100%" }}>
							<DataGrid
								disableSelectionOnClick
								rows={course.data}
								columns={columns}
								pageSize={8}
								density
								sortModel={[
									{
										field: "raw",
										sort: "desc",
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
