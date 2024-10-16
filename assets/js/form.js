document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("multi-step-form");
	const steps = Array.from(document.querySelectorAll(".form__step"));
	const dots = Array.from(document.querySelectorAll(".form__dot"));
	const currentStepSpan = document.getElementById("current-step");
	const totalStepsSpan = document.getElementById("total-steps");

	let currentStep = 0;

	// Set the total number of steps in the counter
	totalStepsSpan.textContent = steps.length;

	// Function to show the current step
	function showStep(stepIndex) {
		steps.forEach((step, index) => {
			step.classList.toggle("form__step--active", index === stepIndex);
			dots[index].classList.toggle("form__dot--active", index <= stepIndex);
		});
		currentStepSpan.textContent = stepIndex + 1;
	}

	// Initial display
	showStep(currentStep);

	// Handle next step
	form.querySelectorAll(".form__button--next").forEach((button) => {
		button.addEventListener("click", () => {
			currentStep++;
			if (currentStep >= steps.length) {
				currentStep = steps.length - 1; // Prevent going past the last step
			}
			showStep(currentStep);
		});
	});

	// Handle previous step
	form.querySelectorAll(".form__button--prev").forEach((button) => {
		button.addEventListener("click", () => {
			currentStep--;
			if (currentStep < 0) {
				currentStep = 0; // Prevent going before the first step
			}
			showStep(currentStep);
		});
	});

	// Form submit
	form.addEventListener("submit", (e) => {
		e.preventDefault(); // Prevent default form submission for demo
		alert("Form submitted successfully!");
	});
});

const togglePassword = document.getElementById("toggle-password");
const passwordInput = document.getElementById("confirm-password");
const eyeIcon = document.getElementById("eye-icon");
const closedEyeIcon = document.getElementById("eye-icon-closed");

togglePassword.addEventListener("click", function () {
	const isPasswordVisible = passwordInput.type === "password";
	passwordInput.type = isPasswordVisible ? "text" : "password";

	// Toggle between icons
	if (isPasswordVisible) {
		eyeIcon.classList.add("hidden");
		closedEyeIcon.classList.remove("hidden");
	} else {
		eyeIcon.classList.remove("hidden");
		closedEyeIcon.classList.add("hidden");
	}
});
