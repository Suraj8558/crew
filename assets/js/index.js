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

	// Share button functionality (optional, can be expanded based on sharing requirements)
	document.getElementById("share-btn").addEventListener("click", () => {
		const emailText = document.getElementById("email-text").textContent;
		// Example share functionality: open email client with the email address
		window.location.href = `mailto:?subject=Check this email&body=${emailText}`;
	});
});
