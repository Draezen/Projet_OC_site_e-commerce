
//Mise en forme du prix avec l'internationalisation
prix = (prix) => {
    return new Intl.NumberFormat("fr-FR", {style : "currency", currency : "EUR"}).format(prix)
}

creerElement = (elem, classe, textContent, href, src) =>  {
    const node = document.createElement(elem);
    node.className = classe;
    node.textContent = textContent;
    node.href = href;
    node.src = src;
    return node
}


//création des carte OURSONS sur la page d'index
creerListeProduit = (listeProduits, produits) => {  
    //récupération du container
    const productsElt = document.getElementById(`${produits}Container`);
    //création des éléments
    listeProduits.forEach(produit => {  

        // création des cartes
        const productElt = creerElement("article", `${produits}__card`)
        const productLink = creerElement("a", `${produits}__link`, "","produit.html?id=" + produit._id )
        const productImage = creerElement("img", `${produits}__image`, "", "",produit.imageUrl)
        const productName = creerElement("h2", `${produits}__name`, produit.name)
        const productPrice = creerElement("p", `${produits}__price`, prix(produit.price/100)) 

        //ajout dans le DOM
        productElt.appendChild(productLink);
        productLink.appendChild(productImage);
        productLink.appendChild(productName);
        productLink.appendChild(productPrice);
        productsElt.appendChild(productElt);
                 
    });
}

//Remplisage de la page produit
creerProduit = (infosProduit, produit) => {
    //récupération des champs à remplir
    const productImage = document.getElementById(`${produit}Image`);
    const productName = document.getElementById(`${produit}Name`);
    const productAbout = document.getElementById(`${produit}About`);
    const productColor = document.getElementById(`${produit}Color`);
    const productPrice = document.getElementById(`${produit}Price`);

    //remplissage des champs
    productImage.src = infosProduit.imageUrl;
    productName.textContent = infosProduit.name;
    productAbout.textContent = infosProduit.description;
    for (let color of infosProduit.colors){
        const optionElt = document.createElement("option");
        optionElt.value = color;
        optionElt.textContent = color;
        productColor.appendChild(optionElt)
    }
    productPrice.textContent = prix(infosProduit.price/100);
}

//Ajout du produit au panier
ajoutPanier = (product) => {
    if (localStorage.getItem("panier") !== null) {   
        //concaténation du produit à ajouter avec le panier en local storage
        const panier = product.concat(JSON.parse(localStorage.getItem("panier")))
        //enregistrement du panier mis à jour dans le local storage 
        localStorage.setItem("panier", JSON.stringify(panier))
        //console.log(window.localStorage)
   } else {
       localStorage.setItem("panier", JSON.stringify(product))
   }
}

//Suppression d'un article du panier
supprArticlePanier = (article) => {
    let panier = JSON.parse(localStorage.getItem("panier"))
    if (panier.length > 1) {
        panier.splice(article, 1)
        localStorage.setItem("panier", JSON.stringify(panier))
    } else {
        localStorage.clear()
    }
}

//affichages des produits dans le panier
recapPanier = (container, priceTotal) => {
    container.innerHTML = ""
    const panier = JSON.parse(localStorage.getItem("panier"))
    //console.log(panier)
    if (panier !== null){
        for (let i in panier) {
            const lineElt = creerElement("tr", "basket__recap--row")
            const nameElt = creerElement("td", "basket__recap--name", panier[i].nom)
            const priceElt = creerElement("td", "basket__recap--price", panier[i].prix)
            const quantityElt = creerElement("td", "basket__recap--qty", "qte : " + panier[i].qte)
            const deleteElt = creerElement("button", "basket__recap--supr", "Supprimer" )
            deleteElt.addEventListener("click", function(){
                supprArticlePanier(i)
                recapPanier(container, priceTotal)
            })

            lineElt.appendChild(nameElt)
            lineElt.appendChild(priceElt)
            lineElt.appendChild(quantityElt)
            lineElt.appendChild(deleteElt)
            container.appendChild(lineElt)
        }
    } else {
        //affichage message panier vide
        messageErreur("main", "basketEmpty", "<h1>Votre panier est vide !</h1><h2>Veuillez ajouter des articles !</h2>")
    }
    totalPanierAffichage(priceTotal)
}


//calculer le prix total du panier
totalPanierCalcul = () => {
    const prices = document.getElementsByClassName("basket__recap--price")
    let priceTotal = 0
    for (let price of prices){
        priceTotal += parseInt(price.textContent)   
    }
    return priceTotal
}

//Afficher le prix total du panier
totalPanierAffichage = (container) => {
    const priceTotal = totalPanierCalcul()
    container.textContent = prix(priceTotal)
}

//affichage d'un message sur la page
messageErreur = (selector, id, content) => {
    let mainElt = document.querySelector(selector);
    mainElt.id = id
    mainElt.innerHTML = content;
}