
//affichage d'un message sur la page
const messageErreur = (selector, id, content) => {
    let mainElt = document.querySelector(selector);
    mainElt.id = id
    mainElt.innerHTML = content;
}

//Mise en forme du prix avec l'internationalisation
const prix = (prix) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(prix)
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

//création loader
const addLoader = (selector, id) => {
    const mainElt = document.getElementById(selector)
    mainElt.id = id
    const loaderHeadingElt = creerElement("h2", "", "loaderHeading", "Chargement")
    const loaderElt = creerElement("div", "lds-roller", `div${id}`)
    mainElt.appendChild(loaderHeadingElt)
    mainElt.appendChild(loaderElt)
    for (let i = 0; i < 8; i++) {
        divElt = creerElement("div", "div__loader")
        loaderElt.appendChild(divElt)
    }
}

//Suppression loader
const removeLoader = (id, product) => {
    const containerElt = document.getElementById(id)
    containerElt.id = `${product}Container`
    document.getElementById("divloader").remove()
    document.getElementById("loaderHeading").remove()
}

//création des carte OURSONS sur la page d'index
const creerListeProduit = (listeProduits, produits) => {

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

    removeLoader("loader", produit)

    //récupération du container
    const productElt = document.getElementById(`${produit}Container`);
    //création des éléments

    //Image ourson
    const columnOneELt = creerElement("div", `${produit}__column-one`)
    const teddyImageElt = creerElement("img", "teddy__image", "", "", "", infosProduit.imageUrl)
    teddyImageElt.alt = "photo d'un ourson"

    columnOneELt.appendChild(teddyImageElt)
    
    //Description
    const columnTwoELt = creerElement("div", `${produit}__column-two`)
    const productNameElt = creerElement("h2", `${produit}__name`, "", infosProduit.name )
    const productAboutElt = creerElement("p", `${produit}__about`, "", infosProduit.description)
    const productColorElt = creerElement("form", `${produit}__color`, `${produit}Form`)
    const labelFormElt = creerElement("label", "", "Couleurs : ")
    labelFormElt.setAttribute ("for", `${produit}Color`)
    const selectFormElt = creerElement("select", "", `${produit}Color`)
    selectFormElt.name = "color"
    
    for (let color of infosProduit.colors) {
        const optionElt = document.createElement("option");
        optionElt.value = color;
        optionElt.textContent = color;
        selectFormElt.appendChild(optionElt)
    }

    productColorElt.appendChild(labelFormElt)
    productColorElt.appendChild(selectFormElt)
    
    columnTwoELt.appendChild(productNameElt)
    columnTwoELt.appendChild(productAboutElt)
    columnTwoELt.appendChild(productColorElt)

    //Prix - ajout panier

    const columnThreeELt = creerElement("div", `${produit}__column-three`)
    const productPriceHeadingElt = creerElement("h2", `${produit}__price--heading`, "", "Prix" )
    const productPriceElt = creerElement("p", `${produit}__price`, "", prix(infosProduit.price / 100))
    const productAddElt = creerElement("button", `${produit}__add`, "addToBAsket","Ajouter au panier")

    productAddElt.addEventListener("click", function () {
        //const name = document.getElementById("teddyName").textContent
        //const price = document.getElementById("teddyPrice").textContent
        const product = [{nom : productNameElt.textContent, prix : productPriceElt.textContent, qte : 1, id : id}]
        ajoutPanier(product)
    })

    const productConfirmElt = creerElement("p", `${produit}__confirm`, "confirmAdd")
    const counterClickElt = creerElement("span", "", "counterClick")
    const confirmTextElt = creerElement("span", "", "confirmText")

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
/*
//Remplisage de la page produit
const creerProduit = (infosProduit, produit) => {

    removeLoader("loader")

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
    for (let color of infosProduit.colors) {
        const optionElt = document.createElement("option");
        optionElt.value = color;
        optionElt.textContent = color;
        productColor.appendChild(optionElt)
    }
    productPrice.textContent = prix(infosProduit.price / 100);
}
*/
let compteur = 1

//compteur de click
const compteurClick = () => {
    return compteur++
}

//message de confirmation d'ajout au panier
const confirmationAjout = () => {
    const confirmELt = document.getElementById("confirmText")
    const compteurElt = document.getElementById("counterClick")
    compteurElt.textContent = compteurClick()
    confirmELt.textContent = " Ourson(s) ajouté(s) au panier !"
    setTimeout(function () {
        confirmELt.textContent = ""
        compteurElt.textContent = ""
        compteur = 1
    }, 2000)
}

//Ajout du produit au panier
const ajoutPanier = (product) => {
    if (localStorage.getItem("panier") !== null) {
        //concaténation du produit à ajouter avec le panier en local storage
        const panier = product.concat(JSON.parse(localStorage.getItem("panier")))
        //enregistrement du panier mis à jour dans le local storage 
        localStorage.setItem("panier", JSON.stringify(panier))
    } else {
        localStorage.setItem("panier", JSON.stringify(product))
    }
    confirmationAjout()
}

//Suppression d'un article du panier
const supprArticlePanier = (article) => {
    let panier = JSON.parse(localStorage.getItem("panier"))
    if (panier.length > 1) {
        panier.splice(article, 1)
        localStorage.setItem("panier", JSON.stringify(panier))
    } else {
        localStorage.clear()
    }
}

//affichages des produits dans le panier
const recapPanier = (container, priceTotal) => {
    container.innerHTML = ""
    const panier = JSON.parse(localStorage.getItem("panier"))
    //console.log(panier)
    if (panier !== null) {
        for (let i in panier) {
            const lineElt = creerElement("tr", "basket__recap--row")
            const nameElt = creerElement("td", "basket__recap--name", "", panier[i].nom)
            const priceElt = creerElement("td", "basket__recap--price", "", panier[i].prix)
            const quantityElt = creerElement("td", "basket__recap--qty", "", "qte : " + panier[i].qte)
            const deleteElt = creerElement("button", "basket__recap--supr", "", "Supprimer")
            deleteElt.addEventListener("click", function () {
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

//Validation d'un champ du formulaire
const verifChampValide = (champ, regex, help, id) => {
    let formHelp = "";
    const valide = verifRegexChamp(champ, regex)
    if (valide == false) {
        formHelp = help;
        document.getElementById(id).classList.remove("valide")
    } else {
        formHelp = "\u00A0";
        document.getElementById(id).classList.add("valide")
        document.getElementById("formInvalid").textContent = formHelp
    }
    document.getElementById(id).textContent = formHelp;
}

//Récupérer les id des produit à commander
const ajouterIdCommande = (products) => {
    const panier = JSON.parse(localStorage.getItem("panier"))
    panier.forEach(produit => {
        products.push(produit.id)
    })
    return products
}

//Remplir la commande
const remplirBonCommande = () => {
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

//enregistrement de l'id et du prix
const validerCommande = (data) => {
    const price = parseInt(document.getElementById("basketTotal").textContent)
    const id = data.orderId
    const command = { prix: price, id: id }
    localStorage.setItem("commande", JSON.stringify(command))
}

//récupération de la validation de commande
const afficherValidationCommande = () => {
    const command = JSON.parse(localStorage.getItem("commande"))
    document.getElementById("orderPrice").textContent = prix(command.prix)
    document.getElementById("orderId").textContent = command.id
}