
//récapitulatif de la commande 

//création de la liste des produits dans le panier
const creerListeProduits = () => {
    const basketArticles = document.getElementById("basketArticles")
    const basketTotal = document.getElementById("basketTotal")
    recapPanier(basketArticles, basketTotal)
}

window.addEventListener("load", creerListeProduits)


//vider tout el panier
const viderPanier = () => {

    const clearBasket = document.getElementById("basketClear");

    clearBasket.addEventListener("click", () => {
        localStorage.clear()
        creerListeProduits()
    })
}

viderPanier()

//Formulaire

//Vérification de la saisie dans les champs du formulaire

//nom
document.getElementById("formLastName").addEventListener("blur", (e) => {
    //lettres + accents + - et espace
    const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
    verifChampValide(e, regex, "Nom invalide", "helpLastName")
})

//prénom
document.getElementById("formFirstName").addEventListener("blur", (e) => {
    const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
    verifChampValide(e, regex, "Prénom invalide", "helpFirstName")
})

//adresse
document.getElementById("formAddress").addEventListener("blur", (e) => {
    const regex = /^\S[\wÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
    verifChampValide(e, regex, "Adresse invalide", "helpAddress")
})
//ville
document.getElementById("formCity").addEventListener("blur", (e) => {
    const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
    verifChampValide(e, regex, "Ville invalide", "helpCity")
})

//mail
document.getElementById("formEmail").addEventListener("blur", (e) => {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    const regex = /\b[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
    verifChampValide(e, regex, "Adresse invalide", "helpEmail")
})

//Envoie de la commande

//vérification de la validation du formulaire
const validerFormulaire = (form) =>{

    const formValide = document.getElementsByClassName("form__help valide")
    
    if (formValide.length === 5){

        //envoie de commande en cours
        //loaderCommande()

        //completer la commande
        const urlOrder = "http://localhost:3000/api/teddies/order";
        const order = remplirBonCommande(form)

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
const envoyerFormulaire = () => {

    const form = document.getElementById("basketForm").querySelector("form")
    
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        validerFormulaire(form)
    })
}

envoyerFormulaire()