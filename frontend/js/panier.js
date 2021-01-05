const urlOrder = "http://localhost:3000/api/teddies/order"; 
const urlTeddies = "http://localhost:3000/api/teddies";

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

//Vérification de l'état du serveur
function etatServeur (url) {
    const response = getProduct(url);
    return response
}

//récapitulatif de la commande 

const basketArticles = document.getElementById("basketArticles")
const basketTotal = document.getElementById("basketTotal")

//création de la liste des produits dans le panier
window.addEventListener("load", function(){  
    etatServeur(urlTeddies).then (response => {
        if (response.name === "TypeError"){
            messageErreur("main", "serverDown", "<h1>Problème de connexion !</h1> <h2> Veuillez réessayer dans quelques instants !</h2>")
        }else {
            recapPanier(basketArticles,basketTotal)
        }
    }) 
})

const clearBasket = document.getElementById("basketClear");

//vider tout el panier
clearBasket.addEventListener("click", function(){
    localStorage.clear()
    recapPanier(basketArticles, basketTotal)
})



//Formulaire

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




