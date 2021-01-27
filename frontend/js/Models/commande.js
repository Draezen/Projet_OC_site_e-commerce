class ModelCommande {
    constructor(){
    }

    //Remplir la commande
    remplirBonCommande = (form, storage) => {
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

        this.ajouterIdCommande(order.products, storage)

        return order
    }
    
    //Récupérer les id des produit à commander
    ajouterIdCommande = (produits, storage) => {
        const panier = storage.lire("panier")

        panier.forEach(produit => {
            produits.push(produit.id)
        })

        return produits
    }
    
    //enregistrement de l'id et du prix
    validerCommande = (data, storage) => {
        const price = parseInt(document.getElementById("basketTotal").textContent)
        const id = data.orderId
        const commande = { prix: price, id: id }
        storage.creer("commande", commande)
    }

}






