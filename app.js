const root = document.querySelector(".app");

const UI = createUI(root);
const Store = createStore();

const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const mailInput = document.querySelector("#mail");
const idInput = document.querySelector("#contact-id");
const addBtn = document.querySelector("#add-btn");
const editBtn = document.querySelector("#edit-btn");
const formBtn = document.querySelector("#form-btn");
const list = document.querySelector("#contact-list");
const searchInput = document.querySelector("#search-input");

//  #DISPLAY LIST
document.addEventListener("DOMContentLoaded", () => {
	UI.displayContacts(Store.getContacts());
});

//  #ADD CONTACT
addBtn.addEventListener("click", (e) => {
	e.preventDefault();

	const name = nameInput.value.trim();
	const phone = phoneInput.value;
	const mail = mailInput.value;

	if (name === "" || phone === "" || mail === "") {
		UI.createAlert("Please fill in all  fields", "warning");
	}
	else {
		const contact = Store.createContact(name, phone, mail);
		Store.addContact(contact);
		UI.displayContacts(Store.getContacts());
		UI.closeContactForm();
		UI.createAlert("Contact Added!", "success");
	}
});

// #CONTACT LIST EVENT DELEGATION
list.addEventListener("click", (e) => {
	// #DELETE CONTACT
	if (e.target.classList.contains("delete")) {
		Store.deleteContact(e.target.dataset.idname);
		UI.displayContacts(Store.getContacts());
		UI.createAlert("Contact Deleted", "success");
	}
	else if (e.target.classList.contains("edit")) {
		// #EDIT CONTACT

		if (form.classList.contains("hide")) {
			UI.openContactForm();
			const oldContactId = e.target.dataset.idname;
			const contact = Store.getEditContact(oldContactId);
			nameInput.value = contact.name;
			phoneInput.value = contact.phone;
			mailInput.value = contact.mail;

			editBtn.classList.remove("hide");
			addBtn.classList.add("hide");

			editBtn.addEventListener(
				"click",
				(e) => {
					if (nameInput.value === "" || phoneInput.value === "" || mailInput.value === "") {
						return;
					}
					else {
						const editedContact = Store.createContact(nameInput.value, phoneInput.value, mailInput.value);
						Store.deleteContact(oldContactId);
						Store.addContact(editedContact);
						UI.displayContacts(Store.getContacts());
						UI.clearInputs([ nameInput, phoneInput, mailInput, searchInput ]);
						UI.createAlert("Contact Edited!", "success");
					}
				},
				{ once: true }
			);
		}
	}
	else if (e.target.classList.contains("min-contact")) {
		// #EXPAND CONTACT CARD
		let card;
		if (e.target.nodeName === "DIV") {
			card = e.target.parentNode;
		}
		else {
			card = e.target.parentNode.parentNode;
		}
		const cardBtns = card.querySelector(".icons");
		if (cardBtns.classList.contains("hide")) {
			UI.openCard(card);
		}
		else {
			UI.closeCard(card);
		}
	}
});

//  #DISPLAY CONTACT FORM BTN
formBtn.addEventListener("click", () => {
	if (form.classList.contains("hide")) {
		addBtn.classList.remove("hide");
		editBtn.classList.add("hide");
		UI.openContactForm();
		UI.toggleFormBtn("open");
	}
	else {
		UI.closeContactForm();
	}
});

// #CLOSE ELEMENT WHEN USER CLICKS OUTSIDE
document.addEventListener("click", (event) => {
	// #CONTACT FORM
	if (!form.classList.contains("hide")) {
		if (!form.contains(event.target)) {
			if (
				event.target !== formBtn &&
				event.target !== formBtn.querySelector("i") &&
				!event.target.classList.contains("edit")
			) {
				UI.closeContactForm();
			}
		}
	}
	if (!list.contains(event.target)) {
		// #CONTACT CARD
		const cards = list.querySelectorAll(".card");
		cards.forEach((card) => {
			const cardBtns = card.querySelector(".icons");
			const cardBody = card.querySelector(".card-body");
			card.classList.add("card-close");
			card.classList.remove("card-open");
			cardBtns.classList.add("hide");
			cardBody.classList.add("hide");
		});
	}
});

// #SEARCH
searchInput.addEventListener("keyup", (e) => {
	list.innerHTML = "";
	const subString = searchInput.value.toUpperCase();
	const contacts = Store.getContacts();
	if (subString === "") {
		UI.displayContacts(contacts);
	}
	else {
		contacts.forEach((contact) => {
			const name = contact.name.toUpperCase();
			if (name.includes(subString)) {
				UI.renderContact(contact);
				const card = list.querySelector(`[data-idname=${contact.id}]`).parentNode.parentNode.parentNode
					.parentNode;
				UI.openCard(card);
			}
		});
	}
});

// #RESET CONTACT  LIST AND CLEAR SEARCH INPUT
// searchInput.addEventListener("blur", () => {
// 	UI.clearInputs([ searchInput ]);
// 	setTimeout(() => {
// 		UI.displayContacts(Store.getContacts());
// 	}, 200);
// });
