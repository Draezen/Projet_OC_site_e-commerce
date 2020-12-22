let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
}

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
    var regexCourriel = /.+@.+\..+/;
    var validiteCourriel = "";
    if (!regexCourriel.test(e.target.value)) {
        validiteCourriel = "Adresse invalide";
    }else {
        validiteCourriel = "\u00A0";
    }
    document.getElementById("helpEmail").textContent = validiteCourriel;
});
