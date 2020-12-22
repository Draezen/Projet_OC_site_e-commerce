let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
}

let products = [];

let form = document.getElementById("basketForm").querySelector("form")

form.addEventListener("submit", function (e) {
    contact.lastName = form.elements.formLastName.value;
    contact.firstName = form.elements.formFirstName.value;
    contact.address = form.elements.formAddress.value;
    contact.city = form.elements.formCity.value;
    contact.email = form.elements.formEmail.value;
    e.preventDefault()
})

document.getElementById("formEmail").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    let regexMail = /.+@.+\..+/;
    let valideMail = "";
    if (!regexMail.test(e.target.value)) {
        valideMail = "Adresse invalide";
    }else {
        valideMail = "\u00A0";
    }
    document.getElementById("helpEmail").textContent = valideMail;
});

