
let compteur = 1

//compteur de click
const compteurClick = () => {
    return compteur++
}

//Mise en forme du prix avec l'internationalisation
const prix = (prix) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(prix)
}

//calculer le prix total du panier
const totalPanierCalcul = () => {
    const prices = document.getElementsByClassName("basket__recap--price")
    let priceTotal = 0
    for (let price of prices) {
        priceTotal += parseInt(price.textContent)
    }
    return priceTotal
}

//Afficher le prix total du panier
const totalPanierAffichage = (container) => {
    const priceTotal = totalPanierCalcul()
    container.textContent = prix(priceTotal)
}

//Vérification saisie
const verifRegexChamp = (champ, regex) => {
    if (!regex.test(champ.target.value)) {
        return false;
    }
}

//Remplir la commande
const remplirBonCommande = (form) => {
    const order = {
        contact: {
            firstName: form.elements.formFirstName.value,
            lastName: form.elements.formLastName.value,
            address: form.elements.formAddress.value,
            city: form.elements.formCity.value,
            email: form.elements.formEmail.value
        },
        products: []
    }
    ajouterIdCommande(order.products)
    return order
}