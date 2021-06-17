import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

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

export default function MenuAppBar({ children }) {
	const classes = useStyles();
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleChange = (event) => {
		setAuth(event.target.checked);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	function logout() {
		localStorage.clear();
		window.location.href = "/";
	}

	function goSummary() {
		window.location.href = "summary";
	}

	function goCourses() {
		window.location.href = "courses";
	}
	function goDashboard() {
		window.location.href = "dashboard";
	}
	function goFaculty() {
		window.location.href = "faculty";
	}
	function goAll() {
		window.location.href = "everything";
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{children}
					{auth && (
						<div>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
								onClick={handleMenu}
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={goSummary}>Summary</MenuItem>
								<MenuItem onClick={goCourses}>
									By Course
								</MenuItem>
								<MenuItem onClick={goAll}>
									All Deadlines
								</MenuItem>
								<MenuItem onClick={goFaculty}>
									Faculty List
								</MenuItem>
								<MenuItem onClick={goDashboard}>
									Change Courses
								</MenuItem>
								<MenuItem onClick={logout}>Logout</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
