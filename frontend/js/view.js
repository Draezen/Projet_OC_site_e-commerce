

creerListeProduit = (listeProduits, produits) => {  
    console.log(listeProduits)
    //récupération du container
    let productsElt = document.getElementById(`${produits}Container`);
    //création des éléments
    listeProduits.forEach(produit => { 
        /*const nodes = ["article", "a", "img", "h2", "p"]
        nodes.forEach(node => {
            let productElt = document.createElement(node)
            productElt.className = `${produits}__card`
            console.log(productElt)
        })*/
        
        //carte
        let productElt = document.createElement("article");
        productElt.className = `${produits}__card`
        //lien
        let productLink = document.createElement("a");
        productLink.href = "produit.html";
        productLink.className = `${produits}__link`
        //image
        let productImage = document.createElement("img");
        productImage.src = produit.imageUrl;
        productImage.className = `${produits}__image`;
        //nom
        let productName = document.createElement("h2")
        productName.textContent = produit.name;
        productName.className = `${produits}__name`;
        //prix
        let productPrice = document.createElement("p");
        productPrice.textContent = produit.price + " €";
        productPrice.className = `${produits}__price`;

        //ajout dans le DOM
        productElt.appendChild(productLink);
        productLink.appendChild(productImage);
        productLink.appendChild(productName);
        productLink.appendChild(productPrice);
        productsElt.appendChild(productElt);
                
    });
}