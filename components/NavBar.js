import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

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

export default function AppNavBar({ children }) {
	const classes = useStyles();

	function logout() {
		localStorage.clear();
		window.location.href = "/";
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{children}
					<Button color="inherit" href="/summary">
						Summary
					</Button>
					<Button color="inherit" href="/courses">
						By Course
					</Button>
					<Button color="inherit" href="/everything">
						All in One
					</Button>
					<Button color="inherit" href="/dashboard">
						Change Courses
					</Button>
					<Button color="inherit" onClick={logout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<br></br>
		</div>
	);
}