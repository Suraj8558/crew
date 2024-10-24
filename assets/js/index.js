document.addEventListener("DOMContentLoaded", () => {
	const button = document.getElementById("copy-btn");
	// Select all accordion headers
	const accordionHeaders = document.querySelectorAll(".accordion__header");

	// Open the first accordion by default
	const firstAccordionItem = document.querySelector(".accordion__item");
	const firstAccordionContent = firstAccordionItem.querySelector(
		".accordion__content"
	);
	firstAccordionItem.classList.add("accordion--active");
	firstAccordionContent.style.maxHeight =
		firstAccordionContent.scrollHeight + "px";

	// Add event listener to each accordion header
	accordionHeaders.forEach((accordionHeader) => {
		accordionHeader.addEventListener("click", () => {
			const accordionItem = accordionHeader.parentElement;
			const accordionContent = accordionItem.querySelector(
				".accordion__content"
			);

			// Close all other accordion items
			document.querySelectorAll(".accordion__item").forEach((item) => {
				if (item !== accordionItem) {
					item.classList.remove("accordion--active");
					item.querySelector(".accordion__content").style.maxHeight = null; // Collapse
				}
			});

			// Toggle active class on the clicked accordion item
			accordionItem.classList.toggle("accordion--active");

			// Expand or collapse the content of the clicked accordion item
			if (accordionItem.classList.contains("accordion--active")) {
				accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"; // Expand
			} else {
				accordionContent.style.maxHeight = null; // Collapse
			}
		});
	});


	//  copy text
	button?.addEventListener("click", () => {
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
