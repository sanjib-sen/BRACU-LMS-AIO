import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function Footer() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			<br></br>
			<br></br>
			<br></br>A tribute to Mahbub Majumdar Sir {"❤"}
			<br></br>
			{"Made By "}
			<Link
				color="inherit"
				href="https://www.facebook.com/sanjib.kumarsen.963/"
			>
				Sanjib Kumar Sen
			</Link>{" "}
		</Typography>
	);
}
