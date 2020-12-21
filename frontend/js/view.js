

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
    //récupération du container
    const productsElt = document.getElementById(`${produits}Container`);
    //création des éléments
    listeProduits.forEach(produit => {    
        // création des cartes
        const productElt = creerElement("article", `${produits}__card`)
        const productLink = creerElement("a", `${produits}__link`, "","produit.html?id=" + produit._id )
        //productLink.id = produit._id;
        const productImage = creerElement("img", `${produits}__image`, "", "",produit.imageUrl)
        const productName = creerElement("h2", `${produits}__name`, produit.name)
        const productPrice = creerElement("p", `${produits}__price`, prix(produit.price)) 
        //productPrice.id = `${produits}Price`;

        //ajout dans le DOM
        productElt.appendChild(productLink);
        productLink.appendChild(productImage);
        productLink.appendChild(productName);
        productLink.appendChild(productPrice);
        productsElt.appendChild(productElt);
                 
    });
}

changementPrix = (lang, listeProduits, produits) => {
    document.lang = lang
    console.log(listeProduits)
    let productPrice = document.getElementsByClassName(`${produits}__price`);
    console.log(productPrice);
    for ( let i in productPrice){
        productPrice[i].textContent = prix((listeProduits[i].price), lang)
    }
    /*listeProduits.forEach(produit => {
        //let productPrice = document.getElementById(`${produits}Price`);
        //console.log(productPrice);
        let productPrice = document.getElementsByClassName(`${produits}__price`);
        console.log(productPrice);
        //productPrice.textContent = prix(produit.price, lang)
    })*/
}

creerProduit = (infosProduit, produit) => {
    const productImage = document.getElementById(`${produit}Image`);
    const productName = document.getElementById(`${produit}Name`);
    const productAbout = document.getElementById(`${produit}About`);
    const productColor = document.getElementById(`${produit}Color`);
    const productPrice = document.getElementById(`${produit}Price`);

    productImage.src = infosProduit.imageUrl;
    productName.textContent = infosProduit.name;
    productAbout.textContent = infosProduit.description;
    for (let color of infosProduit.colors){
        const optionElt = document.createElement("option");
        optionElt.value = color;
        optionElt.textContent = color;
        productColor.appendChild(optionElt)
    }
    productPrice.textContent = prix(infosProduit.price);
}