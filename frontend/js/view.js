//affichage d'un message sur la page
const messageErreur = (selector, id, content) => {
    let mainElt = document.querySelector(selector);
    mainElt.id = id
    mainElt.innerHTML = content;
}

//créer un noeud
const creerElement = (elem, classe, id, textContent, href, src) => {
    const node = document.createElement(elem);
    if (classe !== undefined){
        if(classe.length > 0){
            node.className = classe;
        }
    }
    if (id !== undefined){
        if(id.length > 0){
            node.id = id;
        }
    }
    node.textContent = textContent;
    node.href = href;
    node.src = src;
    return node
}

//loader commande en cours
const loaderCommande = () => {
    const mainElt = document.getElementById("formInvalid")
    mainElt.textContent="Envoie commande en cours ..."
    mainElt.id= "loaderCommande"
}

//création loader
const addLoader = (selector, id) => {
    const mainElt = document.getElementById(selector)
    mainElt.id = id
    const loaderHeadingElt = creerElement("h2", "", "loaderHeading", "Chargement")
    const loaderElt = creerElement("div", "lds-roller", `div${id}`)
    //création des noeuds pour l'animation
    mainElt.appendChild(loaderHeadingElt)
    mainElt.appendChild(loaderElt)
    //création des div pour l'animation
    for (let i = 0; i < 8; i++) {
        divElt = creerElement("div", "div__loader")
        loaderElt.appendChild(divElt)
    }
}

//Suppression loader
const removeLoader = (id, product) => {
    const containerElt = document.getElementById(id)
    containerElt.id = `${product}Container`
    //suppression des noeuds de l'animation
    document.getElementById("divloader").remove()
    document.getElementById("loaderHeading").remove()
}

//création des carte OURSONS sur la page d'index
const creerListeProduit = (listeProduits, produits) => {

    //suppression de loader
    removeLoader("loader", produits)

    //récupération du container
    const productsElt = document.getElementById(`${produits}Container`);
    //création des éléments
    listeProduits.forEach(produit => {

        // création des cartes
        const productElt = creerElement("article", `${produits}__card`)
        const productLink = creerElement("a", `${produits}__link`, "", "", "produit.html?id=" + produit._id)
        const productImage = creerElement("img", `${produits}__image`, "", "", "", produit.imageUrl)
        const productName = creerElement("h2", `${produits}__name`, "", produit.name)
        const productPrice = creerElement("p", `${produits}__price`, "", prix(produit.price / 100))

        //ajout dans le DOM
        productElt.appendChild(productLink);
        productLink.appendChild(productImage);
        productLink.appendChild(productName);
        productLink.appendChild(productPrice);
        productsElt.appendChild(productElt);

    });
}


const creerProduit = (infosProduit, produit) => {

    //suppression du loader
    removeLoader("loader", produit)

    //récupération du container
    const productElt = document.getElementById(`${produit}Container`);

    //création des éléments

    //Image ourson
    //création des éléments
    const columnOneELt = creerElement("div", `${produit}__column-one`)
    const teddyImageElt = creerElement("img", "teddy__image", "", "", "", infosProduit.imageUrl)
    teddyImageElt.alt = "photo d'un ourson"

    //ajout dans le DOM
    columnOneELt.appendChild(teddyImageElt)
    
    //Description
    //création des éléments
    const columnTwoELt = creerElement("div", `${produit}__column-two`)
    const productNameElt = creerElement("h2", `${produit}__name`, "", infosProduit.name )
    const productAboutElt = creerElement("p", `${produit}__about`, "", infosProduit.description)
    const productColorElt = creerElement("form", `${produit}__color`, `${produit}Form`)
    const labelFormElt = creerElement("label", "", "Couleurs : ")
    labelFormElt.setAttribute ("for", `${produit}Color`)
    const selectFormElt = creerElement("select", "", `${produit}Color`)
    selectFormElt.name = "color"
    
    //remplissage de la selection des couleurs
    for (let color of infosProduit.colors) {
        const optionElt = document.createElement("option");
        optionElt.value = color;
        optionElt.textContent = color;
        selectFormElt.appendChild(optionElt)
    }

    //ajout dans le DOM
    productColorElt.appendChild(labelFormElt)
    productColorElt.appendChild(selectFormElt)

    columnTwoELt.appendChild(productNameElt)
    columnTwoELt.appendChild(productAboutElt)
    columnTwoELt.appendChild(productColorElt)

    //Prix - ajout panier
    //création des éléments
    const columnThreeELt = creerElement("div", `${produit}__column-three`)
    const productPriceHeadingElt = creerElement("h2", `${produit}__price--heading`, "", "Prix" )
    const productPriceElt = creerElement("p", `${produit}__price`, "", prix(infosProduit.price / 100))
    const productAddElt = creerElement("button", `${produit}__add`, "addToBAsket","Ajouter au panier")

    //fonction ajout au panier sur le boutton
    productAddElt.addEventListener("click", () => {
        const product = [{nom : productNameElt.textContent, prix : productPriceElt.textContent, qte : 1, id : infosProduit._id}]
        ajoutPanier(product)
    })

    const productConfirmElt = creerElement("p", `${produit}__confirm`, "confirmAdd")
    const counterClickElt = creerElement("span", "", "counterClick")
    const confirmTextElt = creerElement("span", "", "confirmText")

    //Ajout dans le DOM
    productConfirmElt.appendChild(counterClickElt)
    productConfirmElt.appendChild(confirmTextElt)

    columnThreeELt.appendChild(productPriceHeadingElt)
    columnThreeELt.appendChild(productPriceElt)
    columnThreeELt.appendChild(productAddElt)
    columnThreeELt.appendChild(productConfirmElt)

    productElt.appendChild(columnOneELt)
    productElt.appendChild(columnTwoELt)
    productElt.appendChild(columnThreeELt)
}

//message de confirmation d'ajout au panier
const confirmationAjout = () => {
    const confirmELt = document.getElementById("confirmText")
    const compteurElt = document.getElementById("counterClick")
    //création du message
    compteurElt.textContent = compteurClick()
    confirmELt.textContent = " Ourson(s) ajouté(s) au panier !"
    //supprimer le message apres 2s
    setTimeout( () => {
        confirmELt.textContent = ""
        compteurElt.textContent = ""
        compteur = 1
    }, 2000)
}


//affichages des produits dans le panier
const recapPanier = (container, priceTotal) => {
    container.innerHTML = ""
    const panier = JSON.parse(localStorage.getItem("panier"))
    if (panier !== null) {
        //si panier non vide
        for (let i in panier) {
            //création de la liste de produits
            const lineElt = creerElement("tr", "basket__recap--row")
            const nameElt = creerElement("td", "basket__recap--name", "", panier[i].nom)
            const priceElt = creerElement("td", "basket__recap--price", "", panier[i].prix)
            const quantityElt = creerElement("td", "basket__recap--qty", "", "qte : " + panier[i].qte)
            const deleteElt = creerElement("button", "basket__recap--supr", "", "Supprimer")
            //fonction suppression d'un article du panier
            deleteElt.addEventListener("click", () => {
                supprArticlePanier(i)
                //recréation du panier
                recapPanier(container, priceTotal)
            })

            //ajout dans le DOM
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
    //calcul du prix total
    totalPanierAffichage(priceTotal)
}

