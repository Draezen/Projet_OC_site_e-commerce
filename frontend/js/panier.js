const urlOrder = "http://localhost:3000/api/teddies/order"; 

const order = {
    contact : {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: ""
    },
    products :  ["5be9c8541c9d440000665243"]
}


//Envoie de la commande
function envoieCommande (url, data) {
    const confirmationCommande = postOrder(url, data)
    return confirmationCommande
}

let form = document.getElementById("basketForm").querySelector("form")

form.addEventListener("submit", function (e) {
    order.contact.lastName = form.elements.formLastName.value;
    order.contact.firstName = form.elements.formFirstName.value;
    order.contact.address = form.elements.formAddress.value;
    order.contact.city = form.elements.formCity.value;
    order.contact.email = form.elements.formEmail.value;
    
    //Recupération de la confirmation de la commande
    envoieCommande(urlOrder, order).then (returnData => {
        console.log(returnData)
    })
    e.preventDefault()
})


//Vérification des différents champs du formulaire
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




