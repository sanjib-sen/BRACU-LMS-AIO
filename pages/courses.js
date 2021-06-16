import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";

const columns = [
	{ field: "id", hide: true },
	{ field: "date", headerName: "Deadline", width: 400 },
	{ field: "type", headerName: "Assesment Type", width: 300 },
	{
		field: "title",
		headerName: "Assesment Name3",
		sortable: false,
		width: 720,
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
			await fetch(`http://localhost:3000/api/courses`, {
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
		// 		await fetchAPI(link);
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

		// doThis();
		// setCourses(list);
	}, []);

	return (
		<div>
			<Typography variant="h4" align="center">
				Welcome
			</Typography>
			{courses.map((course) => (
				<div>
					<Typography variant="h4" align="center">
						{course.courseId}
					</Typography>
					<div style={{ height: 400, width: "100%" }}>
						<DataGrid
							rows={course.rows}
							columns={columns}
							pageSize={5}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default DataTable;
