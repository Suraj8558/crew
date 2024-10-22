document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("multi-step-form");
	const currentForm = document.getElementById("multiForm");
	const steps = Array.from(document.querySelectorAll(".form__step"));
	const dots = Array.from(document.querySelectorAll(".form__dot"));
	const currentStepSpan = document.getElementById("current-step");
	const totalStepsSpan = document.getElementById("total-steps");
	const passwordInput = document.getElementById("confirm-password");
	const togglePassword = document.getElementById("toggle-password");
	const openEyeIcon = document.querySelector(".open-eye");
	const closedEyeIcon = document.querySelector(".close-eye");
	const uploadContainer = document.getElementById("upload-container");
	const browseBtn = document.getElementById("browse-btn");
	const fileInput = document.getElementById("file-upload");
	const fileNameDisplay = document.getElementById("file-name");
	let isDropped = false;

	let currentStep = 0;


	// Set total steps
	totalStepsSpan.textContent = steps.length;

	// Show the current step
	function showStep(stepIndex) {
		steps.forEach((step, index) =>
			step.classList.toggle("form__step--active", index === stepIndex)
		);
		dots.forEach((dot, index) =>
			dot.classList.toggle("form__dot--active", index <= stepIndex)
		);
		currentStepSpan.textContent = stepIndex + 1;

		// Show/hide buttons based on current step
		const nextButtons = form.querySelectorAll(".form__button--next");
		const submitButtons = form.querySelectorAll(".form__button--submit");
		const prevButtons = form.querySelectorAll(".form__button--prev");

		nextButtons.forEach(
			(button, index) =>
				(button.style.display =
					index === stepIndex && stepIndex < steps.length - 1
						? "inline-block"
						: "none")
		);
		submitButtons.forEach(
			(button) =>
				(button.style.display =
					stepIndex === steps.length - 1 ? "inline-block" : "none")
		);
		prevButtons.forEach(
			(button) =>
				(button.style.display = stepIndex > 0 ? "inline-block" : "none")
		);
	}

	// Initial display
	showStep(currentStep);

	// Handle navigation buttons
	form.addEventListener("click", (e) => {
		if (e.target.matches(".form__button--next")) {
			currentStep = Math.min(currentStep + 1, steps.length - 1);
			showStep(currentStep);
		} else if (e.target.matches(".form__button--prev")) {
			currentStep = Math.max(currentStep - 1, 0);
			showStep(currentStep);
		}
	});

	// Handle form submission
	currentForm.addEventListener("submit", (e) => {
		e.preventDefault(); // Prevent default form submission

		if (currentForm.checkValidity()) {
			// Redirect to success.html after form is valid
			window.location.href = "success.html"; // Update with your actual path to success.html
		} else {
			// Focus on the first invalid field
			const firstInvalidInput = currentForm.querySelector(":invalid");
			if (firstInvalidInput) firstInvalidInput.focus();
		}
	});

	togglePassword.addEventListener("click", () => {
		const isPasswordVisible = passwordInput.type === "password";

		// Toggle input type
		passwordInput.type = isPasswordVisible ? "text" : "password";

		// Toggle eye icon visibility
		openEyeIcon.classList.toggle("hidden", isPasswordVisible); // Hide open eye when password is visible
		closedEyeIcon.classList.toggle("hidden", !isPasswordVisible); // Show closed eye when password is visible
	});

	// File upload handlers
	uploadContainer.addEventListener("click", (e) => {
		// Prevent click event on container when clicking the button
		if (e.target.id !== "browse-btn") {
			fileInput.click();
		}
	});

	// Open file input when the button is clicked
	browseBtn.addEventListener("click", (e) => {
		e.preventDefault(); // Prevent form submission or other default behavior
		fileInput.click();
	});

	// Drag and drop events
	uploadContainer.addEventListener("dragover", (e) => {
		e.preventDefault();
		uploadContainer.style.borderColor = "#e5a01a"; // Change border color on drag
	});

	uploadContainer.addEventListener("dragleave", () => {
		uploadContainer.style.borderColor = "#F4B41A"; // Reset border color when drag leaves
	});

	uploadContainer.addEventListener("drop", (e) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			fileInput.files = files; // Assign dropped files
			displayFileName(files[0]);
			isDropped = true; // Indicate file drop happened
		}
		uploadContainer.style.borderColor = "#F4B41A"; // Reset border color after drop
	});

	// Handle file input change
	fileInput.addEventListener("change", () => {
		if (!isDropped && fileInput.files.length > 0) {
			displayFileName(fileInput.files[0]); // Show file name
		}
		setTimeout(() => (isDropped = false), 0); // Reset the flag
	});

	// Function to display file name
	function displayFileName(file) {
		fileNameDisplay.textContent = `Selected file: ${file.name}`;
	}
});