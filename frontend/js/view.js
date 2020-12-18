

prix = (prix, devise, change) => {
    const langueUtilisee = document.getElementById("lang").value;
    switch (langueUtilisee) {
        case "fr-FR" :
            devise = "EUR";
            change = 1;
            break
        case "en-US" :
            devise = "USD"
            change = 1.2245;
            break
        case "en-GB" :
            devise = "GBP"
            change = 0.9067;
            break
        default :
        console.error("Langue inexistante")
    }
    return new Intl.NumberFormat(langueUtilisee, {style : "currency", currency : devise}).format((prix/100)*change)
}

creerElement = (elem, classe, textContent, href, src) =>  {
    const node = document.createElement(elem);
    node.className = classe;
    node.textContent = textContent;
    node.href = href;
    node.src = src;
    return node
}

creerListeProduit = (listeProduits, produits) => {  
    //console.log(listeProduits)
    //récupération du container
    const productsElt = document.getElementById(`${produits}Container`);
    //création des éléments
    listeProduits.forEach(produit => {    
        // création des cartes
        const productElt = creerElement("article", `${produits}__card`)
        const productLink = creerElement("a", `${produits}__link`, "","produit.html" )
        productLink.id = produit._id;
        const productImage = creerElement("img", `${produits}__image`, "", "",produit.imageUrl)
        const productName = creerElement("h2", `${produits}__name`, produit.name)
        const productPrice = creerElement("p", `${produits}__price`, prix(produit.price)) 

        //ajout dans le DOM
        productElt.appendChild(productLink);
        productLink.appendChild(productImage);
        productLink.appendChild(productName);
        productLink.appendChild(productPrice);
        productsElt.appendChild(productElt);
                 
    });
}

changementPrix = (lang, listeProduits) => {
    document.lang = lang
    listeProduits.forEach(produit => {
        let productPrice = document.getElementById(produit._id).querySelector("p")
        productPrice.textContent = prix(produit.price, lang)
    })
}