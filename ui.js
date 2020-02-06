function createUI(root) {
	let contacts = [];

	root.innerHTML = `
	 <div class="container mt-5 jumbotron">
    <h2 class="title  display-4 text-center ">My Contacts</h2>
    <div id="alert"></div>
    <div class="head" id="head">
      <input type="search" id="search-input" class="form-control " placeholder="Search contact...">
      <h3 id="form-btn" class=" btn btn-info plus "> <i class="fas fa-plus-circle "></i></h3>
    </div>
    <!---------- #FORM -->
    <form id="contact-form" class="hide">
      <div class="form-group ">
        <label for="title"><small>Name</small></label>
        <input class="form-control" type="text" id="name">
        <label for="autor"><small>Phone</small></label>
        <input class="form-control" type="text" id="phone">
        <label for="isbn"><small>Mail</small></label>
				<input class="form-control" type="text" id="mail">
				
      </div>
			<input type="submit" id="add-btn" value="Add Contact" class="btn btn-info btn-block">
			 <input type="submit" id="edit-btn" value="Edit Contact" class="btn btn-success btn-block hide">
    </form>
    <!------ #LIST -->
    <div id="contact-list" class="cards mt-4"></div>
  </div>
	`;

	return {
		displayContacts(contacts) {
			list.innerHTML = "";
			contacts.forEach((contact) => {
				this.addTab(contact, list);
				this.renderContact(contact);
			});
		},

		renderContact(contact) {
			const contactCard = document.createElement("div");
			contactCard.classList.add("card", "border-ligth2", "mb-3", "card-close");

			contactCard.innerHTML = `
		<div class="card-header min-contact">
			<h4 class="min-contact">${contact.name}</h4>
			<div class="icons hide">			
		  <a href="#"><i class="fas fas fa-pen edit" data-idname=${contact.id}></i></a>
			<a href="#"><i class="fas fa-trash-alt delete" data-idname=${contact.id}></i></a>	 
			
			</div>       	
  	</div>
    <div class="card-body hide">
      <h5 class="card-title">${contact.phone}</h5>
			<p class="card-text">${contact.mail}</p>			
    </div>`;

			list.appendChild(contactCard);
		},

		addTab(contact, list) {
			const char = contact.name.charAt(0).toUpperCase();
			if (list.querySelector(`#${char}`) === null) {
				const tab = document.createElement("h4");
				tab.classList.add("list-group-item", "disabled");
				tab.setAttribute("id", `${char}`);
				tab.innerText = `${char}`;
				list.appendChild(tab);
			}
		},

		clearInputs(inputs) {
			//arrray and foreach
			inputs.forEach((input) => {
				input.value = "";
			});
		},

		createAlert(message, color) {
			if (document.querySelector(".alert") === null) {
				const div = document.createElement("div");
				const alert = document.querySelector("#alert");

				div.classList.add("alert", `alert-${color}`);
				div.innerText = message;

				alert.prepend(div);
				alert.scrollIntoView();

				this.interval = setTimeout(() => {
					document.querySelector(".alert").remove();
				}, 2000);
			}
			else if (document.querySelector(".alert").innerText !== message) {
				//modification for deal with two alerts at the same time
				clearTimeout(this.interval);
				document.querySelector(".alert").remove();
				this.createAlert(message, color);
			}
		},

		toggleFormBtn(state) {
			switch (state) {
				case "open":
					formBtn.classList.remove("btn-info");
					formBtn.classList.add("btn-danger");
					formBtn.querySelector("i").classList.add("turn");
					break;
				case "close":
					formBtn.classList.remove("btn-danger");
					formBtn.classList.add("btn-info");
					formBtn.querySelector("i").classList.remove("turn");
					break;
			}
		},

		openContactForm() {
			form.classList.remove("hide");
		},

		closeContactForm() {
			form.classList.add("hide");
		},

		openCard(element) {
			const cardBtns = element.querySelector(".icons");
			const cardBody = element.querySelector(".card-body");
			element.classList.remove("card-close");
			element.classList.add("card-open");
			cardBtns.classList.remove("hide");
			cardBody.classList.remove("hide");
		},

		closeCard(element) {
			const cardBtns = element.querySelector(".icons");
			const cardBody = element.querySelector(".card-body");
			cardBtns.classList.add("hide");
			cardBody.classList.add("hide");
			element.classList.add("card-close");
			element.classList.remove("card-open");
		}
	};
}
