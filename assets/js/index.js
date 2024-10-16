document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("multi-step-form");
	const formSteps = Array.from(document.querySelectorAll(".form-step"));
	const progressDots = Array.from(document.querySelectorAll(".dot"));
	const currentStepSpan = document.getElementById("current-step");
	const totalStepsSpan = document.getElementById("total-steps");

	let currentStep = 0;

	// Set the total number of steps in the counter
	totalStepsSpan.textContent = formSteps.length;

	// Function to show the current step
	function showStep(stepIndex) {
		formSteps.forEach((step, index) => {
			step.classList.toggle("active", index === stepIndex);
			progressDots[index].classList.toggle("active", index <= stepIndex);
		});
		currentStepSpan.textContent = stepIndex + 1;
	}

	// Initial display
	showStep(currentStep);

	// Handle next step
	form.querySelectorAll(".next-step").forEach((button) => {
		button.addEventListener("click", () => {
			currentStep++;
			if (currentStep >= formSteps.length) {
				currentStep = formSteps.length - 1; // Prevent going past the last step
			}
			showStep(currentStep);
		});
	});

	// Handle previous step
	form.querySelectorAll(".prev-step").forEach((button) => {
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
