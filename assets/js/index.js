document.addEventListener("DOMContentLoaded", () => {
	//  copy text
	document.getElementById("copy-btn").addEventListener("click", () => {
		const emailText = document.getElementById("email-text").textContent;
		navigator.clipboard
			.writeText(emailText)
			.then(() => {
				alert("Email copied to clipboard!");
			})
			.catch((err) => {
				console.error("Could not copy email: ", err);
			});
	});
});
