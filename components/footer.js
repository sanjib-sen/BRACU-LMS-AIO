import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function Footer() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			<br></br>
			<br></br>
			<br></br>
			{"Copyright © "}
			<Link
				color="inherit"
				href="https://www.facebook.com/matrixedraku/posts/2825513557703292"
			>
				A tribute to Mahbub Majumdar Sir {"❤"}
			</Link>{" "}
			{/* {new Date().getFullYear()} */}
			{"."}
		</Typography>
	);
}
