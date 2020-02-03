function createStore() {
	let contacts = [];

	return {
		createContact(name, phone, mail) {
			return {
				name,
				phone,
				mail,
				id: `${name.replace(/ /g, "-")}${phone.replace(/ /g, "-")}`
			};
		},

		sortContacts(contacts) {
			function compare(a, b) {
				const nameA = a.name.toUpperCase();
				const nameB = b.name.toUpperCase();

				let comparison = 0;
				if (nameA > nameB) {
					comparison = 1;
				}
				else if (nameA < nameB) {
					comparison = -1;
				}
				return comparison;
			}
			return contacts.sort(compare);
		},

		getContacts() {
			if (localStorage.getItem("contacts") === null) {
				contacts = [];
			}
			else {
				contacts = JSON.parse(localStorage.getItem("contacts"));
				contacts = this.sortContacts(contacts);
			}
			return contacts;
		},

		setContacts(contacts) {
			contacts = this.sortContacts(contacts);
			localStorage.setItem("contacts", JSON.stringify(contacts));
		},

		addContact(contact) {
			contacts = this.getContacts();
			contacts.push(contact);
			this.setContacts(contacts);
		},

		deleteContact(elementData) {
			contacts = this.getContacts();
			contacts.forEach((contact, index) => {
				if (`${contact.name.replace(/ /g, "-")}${contact.phone.replace(/ /g, "-")}` === elementData) {
					contacts.splice(index, 1);
				}
			});
			this.setContacts(contacts);
		},

		getEditContact(elementData) {
			contacts = this.getContacts();
			contacts.forEach((contact) => {
				if (contact.id === elementData) {
					this.editContact = contact;
				}
			});
			return this.editContact;
		}
	};
}

// DUMY CONTACTS

//[{"name":"Ana Doe","phone":"345 567 8971","mail":"ana@mail.com.co","id":"Ana-Doe345-567-8971"},{"name":"Felipe Florez","phone":"654 879 9010","mail":"felipe@mail.com","id":"Felipe-Florez654-879-9010"},{"name":"Francisco Larios","phone":"768 900 0678","mail":"franc@mail.com","id":"Francisco-Larios768-900-0678"},{"name":"Jhon Doe ","phone":"333 444 5565","mail":"jhon@mail.com","id":"Jhon-Doe-333-444-5565"},{"name":"name","phone":"457895","mail":"sdgogi","id":"name457895"},{"name":"Zoe Leonard","phone":"789 009 8787","mail":"zoe@mail.com","id":"Zoe-Leonard789-009-8787"}]
