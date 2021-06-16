import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Body from "../components/container";
import Alert from "@material-ui/lab/Alert";
const useStyle = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const login = () => {
	const [warning, setWarning] = useState();
	const classes = useStyle();
	const { handleSubmit, control } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values) => {
		setWarning("Logging");
		const email = values.email;
		const password = values.password;
		const res = await fetch(`/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const resp = await res.json();
		const string = JSON.stringify(resp);
		if (string.trim().length > 5) {
			localStorage.setItem("cookies", string);
			window.location.href = "dashboard";
		} else {
			setWarning("warning");
		}
	};
	var alert;
	if (warning == "warning") {
		alert = <Alert severity="error">Wrong Email/Password</Alert>;
	} else if (warning == "Logging") {
		alert = <Alert severity="info">Logging in please wait</Alert>;
	} else {
		alert = "";
	}
	return (
		<Body>
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				{alert}
				<form
					className={classes.form}
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					<Controller
						control={control}
						name="email"
						render={({ field }) => (
							<TextField
								{...field}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Email Address"
								autoComplete="email"
								placeholder="Your Bux Email"
								autoFocus
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<TextField
								{...field}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Password"
								type="password"
								autoComplete="current-password"
								autoFocus
								placeholder="Your Bux Password"
							/>
						)}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
				</form>
			</div>
		</Body>
	);
};

export default login;
