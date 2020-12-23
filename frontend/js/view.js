
//Mise en forme du prix avec l'internationalisation
prix = (prix) => {
    return new Intl.NumberFormat("fr-FR", {style : "currency", currency : "EUR"}).format(prix/100)
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
        const productPrice = creerElement("p", `${produits}__price`, prix(produit.price)) 

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
    productPrice.textContent = prix(infosProduit.price);
}

//message Serveur Down
serverDown = () => {
    let mainElt = document.querySelector("main");
    mainElt.id = "serverDown"
    mainElt.innerHTML="<h1>Problème de connexion !</h1> <h2> Veuillez réessayer dans quelques instants !</h2>";
}