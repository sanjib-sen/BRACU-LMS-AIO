import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const columns = [
	{ field: "id", hide: true },
	{ field: "raw", hide: true },
	{ field: "date", headerName: "Deadline", width: 200, sortable: false },
	{ field: "type", headerName: "Assesment Type", width: 200 },
	{
		field: "title",
		headerName: "Assesment Name",
		sortable: false,
		width: 900,
	},
];

const DataTable = () => {
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		var list = [];
		const cookies = localStorage.getItem("cookies");
		const links = localStorage.getItem("courses").split(",");
		async function fetchAPI(link) {
			const courseID = link.split("+")[1];
			await fetch(`/api/courses`, {
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
		// async function childTask() {
		// 	for (const link of links) {
		// 		await fetchAPI(link).then(() => setCourses(list));
		// 	}
		// }
		// Parallel:
		async function childTask() {
			const promises = links.map(async (link) => {
				return await fetchAPI(link);
			});

			await Promise.all(promises);
		}

		(async () => {
			await childTask().then(() => setCourses(list));
		})();
	}, []);

	return (
		<div>
			<Typography variant="h4">All Assesments by Course</Typography>
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
		</div>
	);
};

export default DataTable;
