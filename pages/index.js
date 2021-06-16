import React from "react";

export default function formpage() {
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
			if (localStorage.getItem("courses") != null) {
				window.location.href = "summary";
			} else {
				window.location.href = "dashboard";
			}
		} else {
			window.location.href = "login";
		}
	}

	return <div>{getData() ? goTo() : ""}</div>;
}
