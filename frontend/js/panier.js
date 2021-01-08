const urlOrder = "http://localhost:3000/api/teddies/order";
const urlTeddies = "http://localhost:3000/api/teddies";


//récapitulatif de la commande 

const basketArticles = document.getElementById("basketArticles")
const basketTotal = document.getElementById("basketTotal")

//création de la liste des produits dans le panier
window.addEventListener("load", function () {
    recapPanier(basketArticles, basketTotal)
})

const clearBasket = document.getElementById("basketClear");

//vider tout el panier
clearBasket.addEventListener("click", function () {
    localStorage.clear()
    recapPanier(basketArticles, basketTotal)
})

//Formulaire

//Vérification de la saisie dans les champs du formulaire

//nom
document.getElementById("formLastName").addEventListener("blur", function (e) {
    const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ ]+$/;
    verifChampValide(e, regex, "Nom invalide", "helpLastName")
})

//prénom
document.getElementById("formFirstName").addEventListener("blur", function (e) {
    const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ ]+$/;
    verifChampValide(e, regex, "Prénom invalide", "helpFirstName")
})

//adresse
document.getElementById("formAddress").addEventListener("blur", function (e) {
    const regex = /^\S[\wÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ ]+$/;
    verifChampValide(e, regex, "Adresse invalide", "helpAddress")
})
//ville
document.getElementById("formCity").addEventListener("blur", function (e) {
    const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ ]+$/;
    verifChampValide(e, regex, "Ville invalide", "helpCity")
})

//mail
document.getElementById("formEmail").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    const regex = /.+@.+\..+/;
    verifChampValide(e, regex, "Adresse invalide", "helpEmail")
})

//Envoie de la commande

//vérification de la validation du formulaire
validerFormulaire = (formValide) =>{
    if (formValide.length === 5){
        //completer la commande
        const order = remplirBonCommande()
        //Recupération de la confirmation de la commande
        postOrder(urlOrder, order).then(returnData => {
            if (returnData.name === "TypeError"){
                messageErreur("main", "serverDown", "<h1>Problème de connexion !</h1> <h2> Veuillez réessayer dans quelques instants !</h2>")
            }else {
                validerCommande(returnData)
                window.location.href = "./confirmation.html"
            }
        })
    } else {
        document.getElementById("formInvalid").textContent = "Formulaire non valide ! Vérifiez les informations entrées.";
    }
}

//Envoie du formulaire
const form = document.getElementById("basketForm").querySelector("form")

form.addEventListener("submit", function (e) {
    e.preventDefault()
    const valide = document.getElementsByClassName("form__help valide")
    validerFormulaire(valide)
})

