class View {
    constructor() {}

    creerElement(tag, className, id, textContent, href, src){
        const element = document.createElement(tag)
        element.tag = tag;
        if (className) element.className = className;
        if (id) element.id = id;
        element.textContent = textContent;
        element.href = href;
        element.src = src;
        return element
    }

    supprimerElement(selecteur){
        selecteur.remove()
    }

    selectionnerElement(selecteur){
        return document.querySelector(selecteur) 
    }

    creerListeProduit = (listeProduits, produits) => {

        //suppression de loader
        removeLoader("#loader", produits)
    
        //récupération du container
        //const productsElt = document.getElementById(`${produits}Container`);
        const productsElt = this.selectionnerElement(`#${produits}Container`)
        //création des éléments
        listeProduits.forEach(produit => {
    
            // création des cartes
            const productElt = this.creerElement("article", `${produits}__card`)
            const productLink = this.creerElement("a", `${produits}__link`, "", "", "produit.html?id=" + produit._id)
            const productImage = this.creerElement("img", `${produits}__image`, "", "", "", produit.imageUrl)
            const productName = this.creerElement("h2", `${produits}__name`, "", produit.name)
            const productPrice = this.creerElement("p", `${produits}__price`, "", prix(produit.price / 100))
    
            //ajout dans le DOM
            productElt.appendChild(productLink);
            productLink.append(productImage, productName, productPrice);
            productsElt.appendChild(productElt);
    
        });
    }
    
}

//affichage d'un message sur la page
const messageErreur = (selector, id, content) => {
    let mainElt = document.querySelector(selector);
    mainElt.id = id
    mainElt.innerHTML = content;
}


//création loader
const addLoader = (selecteur, id) => {
    const mainElt = new View().selectionnerElement(selecteur)
    mainElt.id = id
    const loaderHeadingElt = new View().creerElement("h2", "", "loaderHeading", "Chargement")
    const loaderElt = new View().creerElement("div", "lds-roller", `div${id}`)
    //création des noeuds pour l'animation
    mainElt.appendChild(loaderHeadingElt)
    mainElt.appendChild(loaderElt)
    //création des div pour l'animation
    for (let i = 0; i < 8; i++) {
        divElt = new View().creerElement("div", "div__loader")
        loaderElt.appendChild(divElt)
    }
}

//Suppression loader
const removeLoader = (selecteur, product) => {
    const containerElt = new View().selectionnerElement(selecteur)
    containerElt.id = `${product}Container`
    //suppression des noeuds de l'animation
    document.getElementById("divloader").remove()
    document.getElementById("loaderHeading").remove()
}

//loader commande en cours
const loaderCommande = () => {
    const mainElt = document.getElementById("formInvalid")
    mainElt.textContent="Envoie commande en cours ..."
    mainElt.id= "loaderCommande"
}

// //création des carte OURSONS sur la page d'index
// const creerListeProduit = (listeProduits, produits) => {

//     //suppression de loader
//     removeLoader("#loader", produits)

//     //récupération du container
//     //const productsElt = document.getElementById(`${produits}Container`);
//     const productsElt = new View().selectionnerElement(`#${produits}Container`)
//     //création des éléments
//     listeProduits.forEach(produit => {

//         // création des cartes
//         const productElt = new View().creerElement("article", `${produits}__card`)
//         const productLink = new View().creerElement("a", `${produits}__link`, "", "", "produit.html?id=" + produit._id)
//         const productImage = new View().creerElement("img", `${produits}__image`, "", "", "", produit.imageUrl)
//         const productName = new View().creerElement("h2", `${produits}__name`, "", produit.name)
//         const productPrice = new View().creerElement("p", `${produits}__price`, "", prix(produit.price / 100))

//         //ajout dans le DOM
//         productElt.appendChild(productLink);
//         productLink.append(productImage, productName, productPrice);
//         productsElt.appendChild(productElt);

//     });
// }


const creerProduit = (infosProduit, produit) => {

    //suppression du loader
    removeLoader("#loader", produit)

    //récupération du container
    const productElt = new View().selectionnerElement(`#${produit}Container`);

    //création des éléments

    //Image ourson
    //création des éléments
    const columnOneELt = new View().creerElement("div", `${produit}__column-one`)
    const teddyImageElt = new View().creerElement("img", "teddy__image", "", "", "", infosProduit.imageUrl)
    teddyImageElt.alt = "photo d'un ourson"

    //ajout dans le DOM
    columnOneELt.appendChild(teddyImageElt)
    
    //Description
    //création des éléments
    const columnTwoELt = new View().creerElement("div", `${produit}__column-two`)
    const productNameElt = new View().creerElement("h2", `${produit}__name`, "", infosProduit.name )
    const productAboutElt = new View().creerElement("p", `${produit}__about`, "", infosProduit.description)
    const productColorElt = new View().creerElement("form", `${produit}__color`, `${produit}Form`)
    const labelFormElt = new View().creerElement("label", "", "Couleurs : ")
    labelFormElt.setAttribute ("for", `${produit}Color`)
    const selectFormElt = new View().creerElement("select", "", `${produit}Color`)
    selectFormElt.name = "color"
    
    //remplissage de la selection des couleurs
    for (let color of infosProduit.colors) {
        const optionElt = new View().creerElement("option", "", "", color);
        optionElt.value = color;
        selectFormElt.appendChild(optionElt)
    }

    //ajout dans le DOM
    productColorElt.append(labelFormElt,selectFormElt)

    columnTwoELt.append(productNameElt, productAboutElt,productColorElt)

    //Prix - ajout panier
    //création des éléments
    const columnThreeELt = new View().creerElement("div", `${produit}__column-three`)
    const productPriceHeadingElt = new View().creerElement("h2", `${produit}__price--heading`, "", "Prix" )
    const productPriceElt = new View().creerElement("p", `${produit}__price`, "", prix(infosProduit.price / 100))
    const productAddElt = new View().creerElement("button", `${produit}__add`, "addToBAsket","Ajouter au panier")

    //fonction ajout au panier sur le boutton
    productAddElt.addEventListener("click", () => {
        const product = [{nom : productNameElt.textContent, prix : productPriceElt.textContent, qte : 1, id : infosProduit._id}]
        new Panier().ajouter(product)
        confirmationAjout()
    })

    const productConfirmElt = new View().creerElement("p", `${produit}__confirm`, "confirmAdd")
    const counterClickElt = new View().creerElement("span", "", "counterClick")
    const confirmTextElt = new View().creerElement("span", "", "confirmText")

    //Ajout dans le DOM
    productConfirmElt.append(counterClickElt, confirmTextElt)

    columnThreeELt.append(productPriceHeadingElt, productPriceElt, productAddElt, productConfirmElt)

    productElt.append(columnOneELt, columnTwoELt, columnThreeELt)
}

//message de confirmation d'ajout au panier
const confirmationAjout = () => {
    const confirmELt = new View().selectionnerElement("#confirmText")
    const compteurElt = new View().selectionnerElement("#counterClick")
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
    const panier = new LocalStorage("panier").lire()
    if (panier !== null) {
        //si panier non vide
        for (let i in panier) {
            //création de la liste de produits
            const lineElt = new View().creerElement("tr", "basket__recap--row")
            const nameElt = new View().creerElement("td", "basket__recap--name", "", panier[i].nom)
            const priceElt = new View().creerElement("td", "basket__recap--price", "", panier[i].prix)
            const quantityElt = new View().creerElement("td", "basket__recap--qty", "", "qte : " + panier[i].qte)
            const deleteElt = new View().creerElement("button", "basket__recap--supr", "", "Supprimer")
            //fonction suppression d'un article du panier
            deleteElt.addEventListener("click", () => {
                new Panier().supprimer(i)
                //recréation du panier
                recapPanier(container, priceTotal)
            })

            //ajout dans le DOM
            lineElt.append(nameElt, priceElt, quantityElt, deleteElt)
            container.appendChild(lineElt)
        }
    } else {
        //affichage message panier vide
        messageErreur("main", "basketEmpty", "<h1>Votre panier est vide !</h1><h2>Veuillez ajouter des articles !</h2>")
    }
    //calcul du prix total
    totalPanierAffichage(priceTotal)
}

